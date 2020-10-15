// use lodash keyBy instead of this
const keyBy = (values, key) =>
  values.reduce((accumulator, currentValue) => {
    accumulator[currentValue[key]] = currentValue;
    return accumulator;
  }, {});

export default keyBy;
