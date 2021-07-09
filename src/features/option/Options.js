import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { canToggleSelected } from "../../store/option/optionSlice";
import { getCanToggle } from "../../store/option/optionSelectors";
import { addCar } from "../../store/car/carSlice";

// `React.memo` accomplishes the same thing `connect` was doing for us for perf
const Options = React.memo(() => {
  const canToggle = useSelector(getCanToggle);
  const dispatch = useDispatch();
  return (
    <div className="m-2 p-2">
      <h2>Options</h2>
      <p>
        <button
          className={`btn ${canToggle ? "btn-primary" : "btn-secondary"}`}
          onClick={() => dispatch(canToggleSelected(!canToggle))}
        >
          {canToggle ? "☑ Selection Enabled" : "☐ Selection Disabled"}
        </button>
        <button
          className="btn btn-light ml-2"
          onClick={() => dispatch(addCar("astonMartin"))}
        >
          Add Aston Martin
        </button>
        <button
          className="btn btn-light ml-2"
          onClick={() => dispatch(addCar("audi"))}
        >
          Add Audi
        </button>
      </p>
    </div>
  );
});

export default Options;
