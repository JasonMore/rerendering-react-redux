import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: {},
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    selectCar(state, { payload }) {
      const { id, selected } = payload;
      // add a new car to the map if it does not exist
      state.cars[id] = state.cars[id] ?? {}
      state.cars[id].selected = selected;
    },
  },
});

export const { addAllCars, addCar, selectCar } = carSlice.actions;
export default carSlice.reducer;
