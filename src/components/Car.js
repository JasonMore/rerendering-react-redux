import React from "react";

const Car = ({ car, canToggle, carSelected }) => {
  const onCarClicked = () => {
    if (!canToggle) return;
    carSelected(car.id, !car.selected);
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

export default Car;
