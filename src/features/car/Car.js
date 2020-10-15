import React from "react";
import { connect } from "react-redux";
import { selectCar } from "../../store/actions/car";

const Car = ({ car, canToggle, selectCar }) => {
  const onCarClicked = () => {
    if (!canToggle) return;
    selectCar(car.id, !car.selected);
  };

  return (
    <div className="card m-1" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={car.image}
        height={160}
        alt={car.name}
      />
      <div className="card-body">
        <h5 className="card-title">{car.name}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <button
          className={`btn w-100 ${
            car.selected ? "btn-primary" : "btn-secondary"
          }`}
          onClick={onCarClicked}
        >
          {car.selected ? "☑︎" : "☐"} Selected
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  car: state.car.cars[props.carId],
  canToggle: state.option.canToggle,
});

const mapDispatchToProps = {
  selectCar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Car);
