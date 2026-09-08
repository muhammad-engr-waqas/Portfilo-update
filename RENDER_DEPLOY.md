# Render Deployment Guide

## Render Settings (Static Site)

| Setting | Value |
|---------|-------|
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

## What the build command does

`npm run build` now runs a 4-step pipeline:

1. `tsc -b` — TypeScript type check
2. `vite build` — Client bundle → `dist/`
3. `cross-env BUILD_SSR=true vite build` — SSR bundle → `dist-ssr/`
4. `node prerender.mjs` — Injects server-rendered HTML into `dist/index.html`

The final `dist/index.html` contains real page content (headings, text, sections)
visible to Googlebot on first HTTP response — no JavaScript execution required.

Only the `dist/` folder is deployed. `dist-ssr/` is listed in `.gitignore` and is
only used as an intermediate build artifact during prerendering.

## Rewrite Rule (MUST ADD)
In Render dashboard → Redirects/Rewrites tab:
- **Source:** `/*`
- **Destination:** `/index.html`
- **Action:** `Rewrite`

This ensures direct URL access and page refreshes serve `index.html` (where React
hydrates), rather than returning a 404.

## Notes on hydration

The client bundle uses `hydrateRoot` (not `createRoot`) so React attaches to the
pre-rendered HTML without discarding it. Animations and interactivity work exactly
as before — only the initial HTML is different (now has real content).
