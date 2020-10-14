const isProd = process.env.NODE_ENV === "production";

export const renderCount = () => (next) => (action) => {
  if (isProd || !action.type) {
    return next(action);
  }

  const { clearUnNeededRenderCount } = require("./whyDidYouRenderNotifier");
  clearUnNeededRenderCount();
  console.log(`%c ${action.type}`, "font-weight: bold;");
  return next(action);
};
