import React, { useEffect } from "react";
import { connect } from "react-redux";
import { carData } from "../../_fixtures/mockCarData";
import Car from "../car/Car";
import Options from "../option/Options";
import { addAllCars } from "../../store/actions/car";

const CarsPage = ({ cars, addAllCars }) => {
  useEffect(() => {
    // simulate ajax load
    setTimeout(() => {
      addAllCars(carData);
    }, 500);
  }, [addAllCars]);

  return (
    <div>
      <Options />

      <div className="m-2 p-2">
        <h2>Cars</h2>

        <div className="container-fluid row">
          {cars.map((car) => (
            <Car key={car.id} carId={car.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cars: state.car.cars,
});

const mapDispatchToProps = {
  addAllCars,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarsPage);
