# Render Deployment Guide

## Render Settings (Static Site)

| Setting | Value |
|---------|-------|
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

## Rewrite Rule (MUST ADD)
In Render dashboard → Redirects/Rewrites tab:
- **Source:** `/*`
- **Destination:** `/index.html`
- **Action:** `Rewrite`
