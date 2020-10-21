const initialState = {
  canToggle: true,
};

const option = (state = initialState, action) => {
  switch (action.type) {
    case "OPTION_CAN_TOGGLE":
      return {
        ...state,
        canToggle: action.canToggle,
      };
    default:
      return state;
  }
};

export default option;
