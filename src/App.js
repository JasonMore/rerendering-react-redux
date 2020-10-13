import React from "react";
import CarsContainer from "./containers/CarsPageContainer";

function App() {
  return (
    <div className="container-fluid">
      <h1>Example React Redux unnecessary re-rendering demo</h1>
      <CarsContainer />
    </div>
  );
}

export default App;
