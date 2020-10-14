import React from "react";

const Options = ({ canToggle, canToggleSelected, addCar }) => {
  return (
    <div className="m-2 p-2">
      <h2>Options</h2>
      <p>
        <button
          className={`btn ${canToggle ? "btn-primary" : "btn-secondary"}`}
          onClick={() => canToggleSelected(!canToggle)}
        >
          {canToggle ? "☑ Selection Enabled︎" : "☐ Selection Disabled"}
        </button>
        <button
          className="btn btn-light ml-2"
          onClick={() => addCar("astonMartin")}
        >
          Add Aston Martin
        </button>
        <button className="btn btn-light ml-2" onClick={() => addCar("audi")}>
          Add Audi
        </button>
      </p>
    </div>
  );
};

export default Options;
