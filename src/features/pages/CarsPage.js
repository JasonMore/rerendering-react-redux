import React, { useEffect } from "react";
import { connect } from "react-redux";
import { carData } from "../../_fixtures/mockCarData";
import Car from "../car/Car";
import { canToggleSelected } from "../../store/actions/options";
import Options from "../option/Options";
import { addAllCars, addCar, selectCar } from "../../store/actions/car";

const CarsPage = ({
  carState,
  optionState,
  addAllCars,
  canToggleSelected,
  selectCar,
  addCar,
}) => {
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
          {carState.cars.map((car) => (
            <Car
              key={car.id}
              car={car}
              selectCar={selectCar}
              canToggle={optionState.canToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  carState: state.car,
  optionState: state.option,
});

const mapDispatchToProps = {
  addAllCars,
  canToggleSelected,
  selectCar,
  addCar,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarsPage);
