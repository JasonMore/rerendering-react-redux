import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { carData } from "../../_fixtures/mockCarData";
import Car from "../car/Car";
import Options from "../option/Options";
import { addAllCars } from "../../store/car/carActions";
import { getCars } from "../../store/car/carSelectors";

const CarsPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(getCars);

  useEffect(() => {
    // simulate ajax load
    setTimeout(() => {
      dispatch(addAllCars(carData));
    }, 500);
  }, [dispatch]);

  return (
    <div>
      <Options />

      <div className="m-2 p-2">
        <h2>Cars</h2>

        <div className="container-fluid row">
          {Object.values(cars).map((car) => (
            <Car key={car.id} carId={car.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
