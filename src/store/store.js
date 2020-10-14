import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import car from "./reducers/carReducer";
import option from "./reducers/optionReducer";
import { renderCount } from "./middleware/renderCount";

export default configureStore({
  middleware: [...getDefaultMiddleware(), renderCount],
  reducer: {
    car,
    option,
  },
});
