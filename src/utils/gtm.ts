// Extend the Window interface so TypeScript knows about window.dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export const pushToDataLayer = (eventName: string, params: Record<string, unknown> = {}): void => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
};
