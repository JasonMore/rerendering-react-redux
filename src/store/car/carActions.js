import { carData, imageMap } from "../../_fixtures/mockCarData";
import { getCarById, getCars } from "./carSelectors";
import { getCanToggle } from "../option/optionSelectors";

export const addAllCars = (cars) => ({ type: "CAR_ADD_ALL", cars });

export const selectCar = (id, selected) => ({
  type: "CAR_SELECTED",
  id,
  selected,
});

export const addCar = (name) => ({
  type: "CAR_ADD",
  car: {
    name,
    id: +new Date(),
    selected: false,
    image: imageMap[name],
  },
});

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
  dispatch(selectCar(car.id, !car.selected));
};
