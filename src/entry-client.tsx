import { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/700.css";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (import.meta.env.DEV) {
  // Dev: no pre-rendered HTML exists, use createRoot (normal CSR)
  createRoot(container).render(app);
} else {
  // Production: HTML was pre-rendered by prerender.mjs, attach with hydrateRoot
  hydrateRoot(container, app);
}
