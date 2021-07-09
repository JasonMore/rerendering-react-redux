import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  canToggle: true,
};

const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    canToggleSelected(state, { payload: canToggle }) {
      state.canToggle = canToggle;
    },
  },
});

export const { canToggleSelected } = optionSlice.actions;
export default optionSlice.reducer;
