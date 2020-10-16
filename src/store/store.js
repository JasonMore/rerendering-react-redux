import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import car from "./car/carSlice";
import option from "./option/optionSlice";
import { isDev } from "../isDev";

const middleware = getDefaultMiddleware();

if (isDev) {
  middleware.push(require("./middleware/renderCount").renderCount);
}

export default configureStore({
  middleware,
  reducer: {
    car,
    option,
  },
});
