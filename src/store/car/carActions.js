import { carData } from "../../_fixtures/mockCarData";
import { getCarById, getCars } from "./carSelectors";
import { getCanToggle } from "../option/optionSelectors";
import { addAllCars, selectCar } from "./carSlice";

export const loadCars = () => async (dispatch, getState) => {
  const state = getState();

  // check if already loaded cars
  if (getCars(state).length > 0) return;

  // simulate ajax load
  const data = await new Promise((resolve) =>
    setTimeout(() => resolve(carData), 500)
  );

  dispatch(addAllCars(data));
};

export const carClicked = (carId) => (dispatch, getState) => {
  const state = getState();
  const canToggle = getCanToggle(state);

  if (!canToggle) return;

  const car = getCarById(carId)(state);
  const { id, selected } = car;
  dispatch(selectCar({ id, selected: !selected }));
};
