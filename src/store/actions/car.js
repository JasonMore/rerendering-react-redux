import { imageMap } from "../../_fixtures/mockCarData";

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
