/**
 * prerender.mjs
 *
 * Run AFTER both builds:
 *   1. vite build          → dist/          (client bundle + index.html)
 *   2. BUILD_SSR=true vite build → dist/server/ (SSR bundle)
 *
 * This script:
 *   - Mocks browser globals so Node doesn't crash on window/document/canvas APIs
 *   - Imports the SSR bundle and calls render()
 *   - Replaces <!--app-html--> in dist/index.html with the rendered markup
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── 1. Mock browser globals ─────────────────────────────────────────────────

// Minimal window / globalThis polyfill
const noop = () => {};

// In Node 22, navigator and location are read-only getters — use defineProperty
globalThis.window = globalThis;
globalThis.self = globalThis;

Object.defineProperty(globalThis, "navigator", {
  value: { userAgent: "node", language: "en", languages: ["en"] },
  writable: true,
  configurable: true,
});

Object.defineProperty(globalThis, "location", {
  value: { href: "https://engrmwaqas.online/", pathname: "/", search: "", hash: "" },
  writable: true,
  configurable: true,
});

// document stub
const domElementStub = () => ({
  style: {},
  setAttribute: noop,
  getAttribute: () => null,
  addEventListener: noop,
  removeEventListener: noop,
  appendChild: noop,
  removeChild: noop,
  contains: () => false,
  getBoundingClientRect: () => ({ top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0 }),
  classList: { add: noop, remove: noop, contains: () => false, toggle: noop },
  dataset: {},
  children: [],
  childNodes: [],
  parentNode: null,
  offsetParent: null,
  ownerDocument: null,
});

globalThis.document = {
  createElement: domElementStub,
  createElementNS: domElementStub,
  createTextNode: (t) => ({ textContent: t }),
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: noop,
  removeEventListener: noop,
  documentElement: {
    style: {},
    setAttribute: noop,
    getAttribute: () => null,
    addEventListener: noop,
    removeEventListener: noop,
    classList: { add: noop, remove: noop, contains: () => false, toggle: noop },
    dataset: {},
    lang: "en",
  },
  body: {
    style: {},
    appendChild: noop,
    removeChild: noop,
    addEventListener: noop,
    removeEventListener: noop,
    classList: { add: noop, remove: noop, contains: () => false, toggle: noop },
    dataset: {},
    children: [],
    offsetParent: null,
  },
  head: { appendChild: noop },
  readyState: "complete",
  visibilityState: "visible",
};

globalThis.HTMLElement = class HTMLElement {};
globalThis.Element = class Element {};
globalThis.Event = class Event { constructor(type) { this.type = type; } };
globalThis.CustomEvent = class CustomEvent extends globalThis.Event {};
globalThis.MutationObserver = class MutationObserver { observe() {} disconnect() {} };
globalThis.ResizeObserver = class ResizeObserver { observe() {} unobserve() {} disconnect() {} };
globalThis.IntersectionObserver = class IntersectionObserver { observe() {} unobserve() {} disconnect() {} };
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 16);
globalThis.cancelAnimationFrame = clearTimeout;
globalThis.matchMedia = () => ({ matches: false, addListener: noop, removeListener: noop, addEventListener: noop, removeEventListener: noop });
globalThis.getComputedStyle = () => ({ getPropertyValue: () => "" });
globalThis.performance = { now: () => Date.now(), mark: noop, measure: noop };
globalThis.localStorage = { getItem: () => null, setItem: noop, removeItem: noop };
globalThis.sessionStorage = { getItem: () => null, setItem: noop, removeItem: noop };

// CSS / canvas stubs used by Three.js and Lenis
globalThis.HTMLCanvasElement = class HTMLCanvasElement {
  getContext() { return null; }
};
globalThis.WebGLRenderingContext = class WebGLRenderingContext {};
globalThis.WebGL2RenderingContext = class WebGL2RenderingContext {};

// Stub CSS.supports used by some animation libs
globalThis.CSS = { supports: () => false };

// ─── Patch EventTarget prototype to survive framer-motion's ProjectionNode ───
// framer-motion v12 calls target.addEventListener(ref, ...) where ref=null in SSR
// (React doesn't create real DOM nodes during renderToString, so refs are null).
// We patch the SSR bundle's addDomEvent by overriding it at load time via
// a global that the bundled code checks. The safest approach: monkey-patch
// EventTarget so null/undefined targets silently no-op.
const _nullProto = Object.create(null);
// We can't patch null.addEventListener directly, but we CAN wrap the call
// by making all objects have a fallback addEventListener via globalThis.__addDomEventSafe
globalThis.__ssrNoop = noop;

// Patch: before importing the SSR bundle, we'll patch the module's addDomEvent
// by making Node's global EventTarget accept null targets.
// The actual patch is done by overriding the prototype.
if (typeof EventTarget !== "undefined") {
  const origAdd = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, handler, options) {
    if (!this || !type) return;
    return origAdd.call(this, type, handler, options);
  };
}

// The most reliable approach: wrap the SSR bundle import in a way that
// catches the framer-motion null-ref issue. Since addDomEvent does:
//   target.addEventListener(eventName, handler, options)
// and target is null (React ref in SSR), we make null safe by patching
// Object.prototype temporarily during render.
globalThis.__patchNullForSSR = () => {
  // Temporarily add addEventListener to null's prototype chain
  // This is a hack but necessary for framer-motion SSR compatibility
  try {
    Object.defineProperty(Object.prototype, "addEventListener", {
      value: noop,
      writable: true,
      configurable: true,
    });
  } catch (e) { /* ignore */ }
};

globalThis.__unpatchNullForSSR = () => {
  try {
    delete Object.prototype.addEventListener;
  } catch (e) { /* ignore */ }
};

// ─── 2. Import SSR bundle and render ─────────────────────────────────────────

const ssrBundlePath = new URL("dist-ssr/entry-server.js", import.meta.url).href;

let appHtml = "";
try {
  const { render } = await import(ssrBundlePath);
  // Temporarily patch Object.prototype.addEventListener to handle framer-motion's
  // ProjectionNode calling addEventListener on null refs during renderToString
  globalThis.__patchNullForSSR();
  try {
    appHtml = render();
    console.log("✅ SSR render successful. HTML length:", appHtml.length);
  } finally {
    globalThis.__unpatchNullForSSR();
  }
} catch (err) {
  console.error("❌ SSR render failed:", err.message);
  console.error("Stack:", err.stack?.split("\n").slice(0, 8).join("\n"));
  console.warn("⚠️  Falling back to empty prerender — dist/index.html will have skeleton HTML only.");
  // Graceful fallback: write static skeleton so the page at least has meta tags
  appHtml = `
    <div id="ssr-fallback">
      <h1>Muhammad Waqas | Backend &amp; PWA Developer</h1>
      <p>Backend &amp; PWA Developer from Pakistan. Expert in Node.js, MongoDB, PostgreSQL, RESTful APIs &amp; Progressive Web Apps.</p>
    </div>`;
}

// ─── 3. Inject into dist/index.html ──────────────────────────────────────────

const templatePath = resolve(__dirname, "dist/index.html");
let template = readFileSync(templatePath, "utf-8");

// If a previous failed run already injected fallback content, restore placeholder
if (!template.includes("<!--app-html-->")) {
  // Rebuild the client to get a fresh index.html with the placeholder
  console.warn("⚠️  <!--app-html--> placeholder missing. Re-running client build to restore it...");
  const { execSync } = await import("child_process");
  execSync("npx vite build", { stdio: "inherit", cwd: __dirname });
  template = readFileSync(templatePath, "utf-8");
}

if (!template.includes("<!--app-html-->")) {
  console.error("❌ <!--app-html--> placeholder not found in dist/index.html even after rebuild. Aborting.");
  process.exit(1);
}

const output = template.replace("<!--app-html-->", appHtml);
writeFileSync(templatePath, output, "utf-8");

console.log("✅ Prerender complete → dist/index.html now contains server-rendered HTML.");
