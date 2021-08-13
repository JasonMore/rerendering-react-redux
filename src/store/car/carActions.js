import { getCarById } from "./carSelectors";
import { getCanToggle } from "../option/optionSelectors";
import { selectCar } from "./carSlice";

export const carClicked = (carId) => (dispatch, getState) => {
  const state = getState();
  const canToggle = getCanToggle(state);

  if (!canToggle) return;

  const car = getCarById(carId)(state);
  const { selected } = car ?? {};
  dispatch(selectCar({ id: carId, selected: !selected }));
};
