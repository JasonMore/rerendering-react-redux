import { useMutation, useQuery, useQueryClient } from "react-query";
import { carData, imageMap } from "../_fixtures/mockCarData";
import keyBy from "../store/keyBy";
import { useMemo } from "react";

// local fake car data that would be on the server
const dbCarData = JSON.parse(JSON.stringify(carData));

const GET_CARS = "GET_CARS";

export const useGetCars = () =>
  useQuery(
    GET_CARS,
    async () =>
      // simulate loading from api
      new Promise((resolve) => setTimeout(() => resolve(dbCarData), 500))
  );

export const useAddCar = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (name) => {
      const car = {
        name,
        id: +new Date(),
        selected: false,
        image: imageMap[name],
      };
      dbCarData.push(car);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_CARS);
      },
    }
  );
};

export const useGetCar = (carId) => {
  const { data: cars = [] } = useGetCars();
  const carsHashed = useMemo(() => keyBy(cars, "id"), [cars]);
  return carsHashed?.[carId];
};
