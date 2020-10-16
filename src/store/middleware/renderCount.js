export const renderCount = () => (next) => (action) => {
  const { clearUnNeededRenderCount } = require("./whyDidYouRenderNotifier");
  clearUnNeededRenderCount();
  console.log(`%c ${action.type}`, "font-weight: bold;");
  return next(action);
};
