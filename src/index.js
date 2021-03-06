import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";
import { isDev } from "./isDev";

if (isDev) {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  const whyDidYouRenderNotifier = require("./store/middleware/whyDidYouRenderNotifier");

  whyDidYouRender(React, {
    include: [/.*/],
    exclude: [],
    collapseGroups: true,
    notifier: whyDidYouRenderNotifier.default,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
