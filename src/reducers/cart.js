const initState = {
  items: [],
};

const cart = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_CART_PROPERTIES":
      return {
        ...state,
        [action.key]: action.value,
      };
    case "UPDATE_CART_ITEM_PROPERTIES":
      const { items } = state;
      const newItems = items?.map((e) => {
        if (e.id === action.data.id) {
          return action.data;
        }
        return e;
      });
      return {
        ...state,
        items: newItems,
      };
    case "DELETE_CART_ITEM":
      const listItem = state.items?.filter(e => e.id !== action.data);
      return {
        ...state,
        items: listItem
      }
    default:
      return state;
  }
};

export default cart;
