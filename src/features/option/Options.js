import React from "react";
import { connect } from "react-redux";
import { addCar } from "../../store/actions/car";
import { canToggleSelected } from "../../store/actions/options";

const Options = ({ canToggle, canToggleSelected, addCar }) => {
  return (
    <div className="m-2 p-2">
      <h2>Options</h2>
      <p>
        <button
          className={`btn ${canToggle ? "btn-primary" : "btn-secondary"}`}
          onClick={() => canToggleSelected(!canToggle)}
        >
          {canToggle ? "☑ Selection Enabled" : "☐ Selection Disabled"}
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

const mapStateToProps = (state) => ({
  canToggle: state.option.canToggle,
});

const mapDispatchToProps = {
  canToggleSelected,
  addCar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Options);
