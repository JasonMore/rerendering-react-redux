import { configureStore } from "@reduxjs/toolkit";
import car from "./reducers/carReducer";
import option from "./reducers/optionReducer";

export default configureStore({
  reducer: {
    car,
    option,
  },
});
