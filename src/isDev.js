export const isDev =
    process.env.NODE_ENV !== "production" &&
    !new URLSearchParams(window.location.search).has("disableRenderTracking");
