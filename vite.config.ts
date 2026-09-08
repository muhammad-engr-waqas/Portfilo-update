import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { vitePluginErrorOverlay } from "@hiogawa/vite-plugin-error-overlay";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const isSSR = process.env.BUILD_SSR === "true";

  return {
    base: "/",
    assetsInclude: ["**/*.glb"],
    server: {
      host: "::",
      port: 8080,
    },
    build: isSSR
      ? {
          // SSR server bundle: outputs to dist-ssr/ (kept separate so client build never wipes it)
          outDir: "dist-ssr",
          emptyOutDir: true,
          ssr: "src/entry-server.tsx",
          rollupOptions: {
            output: {
              format: "esm",
            },
          },
        }
      : {
          // Normal client bundle
          outDir: "dist",
          emptyOutDir: true,
          sourcemap: false,
          rollupOptions: {
            input: "index.html",
            output: {
              manualChunks: {
                vendor: ["react", "react-dom"],
                motion: ["framer-motion"],
              },
            },
          },
        },
    ssr: isSSR
      ? {
          // Don't externalise these — bundle them into the SSR output
          // so the server entry is a self-contained ESM file
          noExternal: ["framer-motion", "lenis", "gsap", "three", "lightswind"],
        }
      : undefined,
    plugins: [
      react(),
      tailwindcss(),
      mode === "development" ? vitePluginErrorOverlay() : null,
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

