import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/700.css";

// Use hydrateRoot instead of createRoot so React attaches to
// the server-prerendered HTML without discarding it.
hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <App />
  </StrictMode>
);
