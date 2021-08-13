import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { carClicked } from "../../store/car/carActions";
import { useGetCar } from "../../api/carsApi";
import { getCarById } from "../../store/car/carSelectors";

// `React.memo` accomplishes the same thing `connect` was doing for us for re-rendering perf
const Car = React.memo(({ carId }) => {
  const dispatch = useDispatch();
  const { image, name } = useGetCar(carId);
  const { selected } = useSelector(getCarById(carId)) ?? {};

  const onCarClicked = () => {
    dispatch(carClicked(carId));
  };

  return (
    <div className="card m-1" style={{ width: "18rem" }}>
      <img className="card-img-top" src={image} height={160} alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <button
          className={`btn w-100 ${selected ? "btn-primary" : "btn-secondary"}`}
          onClick={onCarClicked}
        >
          {selected ? "☑︎" : "☐"} Selected
        </button>
      </div>
    </div>
  );
});

export default Car;
