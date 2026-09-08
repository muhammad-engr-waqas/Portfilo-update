import { renderToString } from "react-dom/server";
import { StrictMode } from "react";
import { MotionConfig } from "framer-motion";
import App from "./App.tsx";

export function render(): string {
  // MotionConfig with reducedMotion="always" disables framer-motion's layout
  // projection system (ProjectionNode), preventing DOM addEventListener calls
  // during SSR which would crash in Node.
  return renderToString(
    <StrictMode>
      <MotionConfig reducedMotion="always">
        <App />
      </MotionConfig>
    </StrictMode>
  );
}
