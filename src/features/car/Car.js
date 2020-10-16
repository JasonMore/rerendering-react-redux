import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCar } from "../../store/car/carSlice";
import { getCarById } from "../../store/car/carSelectors";
import { getCanToggle } from "../../store/option/optionSelectors";

// `React.memo` accomplishes the same thing `connect` was doing for us for re-rendering perf
const Car = React.memo(({ carId }) => {
  const dispatch = useDispatch();
  const car = useSelector(getCarById(carId));
  const canToggle = useSelector(getCanToggle);

  const onCarClicked = () => {
    if (!canToggle) return;
    dispatch(selectCar({ id: car.id, selected: !car.selected }));
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
});

export default Car;
