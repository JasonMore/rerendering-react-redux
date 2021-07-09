import { createSlice } from "@reduxjs/toolkit";
import keyBy from "../keyBy";
import { imageMap } from "../../_fixtures/mockCarData";

const initialState = {
  cars: {},
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    addAllCars(state, { payload: cars }) {
      state.cars = keyBy(cars, "id");
    },
    addCar(state, { payload: name }) {
      const car = {
        name,
        id: +new Date(),
        selected: false,
        image: imageMap[name],
      };
      state.cars[car.id] = car;
    },
    selectCar(state, { payload }) {
      const { id, selected } = payload;
      state.cars[id].selected = selected;
    },
  },
});

export const { addAllCars, addCar, selectCar } = carSlice.actions;
export default carSlice.reducer;
