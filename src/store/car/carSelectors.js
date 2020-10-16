export const getCars = (state) => state.car.cars;
export const getCarById = (carId) => (state) => getCars(state)[carId];
