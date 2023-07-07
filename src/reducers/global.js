

const initState = {
  destinationItems: []
};

const global = (state = initState, action) => {
  console.log("check global action :", action);
  switch (action.type) {
    case 'UPDATE_DESTINATION_ITEMS':
      return {
        ...state,
        destinationItems: action.data,
      };
    default:
      return state;
  }
};

export default global;
