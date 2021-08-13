import React from "react";
import Car from "../car/Car";
import Options from "../option/Options";
import { useGetCars } from "../../api/carsApi";

const CarsPage = () => {
  const { data: cars } = useGetCars();

  return (
    <div>
      <Options />

      <div className="m-2 p-2">
        <h2>Cars</h2>

        <div className="container-fluid row">
          {cars?.map((car) => (
            <Car key={car.id} carId={car.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
