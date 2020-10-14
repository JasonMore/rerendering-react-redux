import React, { useEffect } from "react";
import { connect } from "react-redux";
import { carData } from "../_fixtures/mockCarData";
import Car from "../components/Car";
import { canToggleSelected } from "../store/actions/options";
import Options from "../components/Options";
import { addAllCars, addCar, selectCar } from "../store/actions/car";

const CarsPageContainer = ({
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
      <Options
        addCar={addCar}
        canToggle={optionState.canToggle}
        canToggleSelected={canToggleSelected}
      />

      <div className="m-2 p-2">
        <h2>Cars</h2>

        <div className="container-fluid row">
          {carState.cars.map((car) => (
            <Car
              key={car.id}
              car={car}
              carSelected={selectCar}
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

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(CarsPageContainer)
);
