const initialState = {
  cars: [],
};

const car = (state = initialState, action) => {
  switch (action.type) {
    case "CAR_ADD_ALL":
      return {
        ...state,
        cars: action.cars,
      };
    case "CAR_ADD":
      return {
        ...state,
        cars: [action.car, ...state.cars],
      };
    case "CAR_SELECTED":
      return {
        ...state,
        cars: state.cars.map((car) => {
          if (car.id !== action.id) return car;

          return {
            ...car,
            selected: action.selected,
          };
        }),
      };
    default:
      return state;
  }
};

export default car;
