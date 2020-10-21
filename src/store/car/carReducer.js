import keyBy from "../keyBy";

const initialState = {
  cars: {},
};

const car = (state = initialState, action) => {
  switch (action.type) {
    case "CAR_ADD_ALL":
      return {
        ...state,
        cars: keyBy(action.cars, "id"),
      };
    case "CAR_ADD":
      return {
        ...state,
        cars: {
          ...state.cars,
          [action.car.id]: action.car,
        },
      };
    case "CAR_SELECTED":
      return {
        ...state,
        cars: {
          ...state.cars,
          [action.id]: {
            ...state.cars[action.id],
            selected: action.selected,
          },
        },
      };
    default:
      return state;
  }
};

export default car;
