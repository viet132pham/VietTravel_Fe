
import * as actionTypeVehicle from "../components/Pages/components/Vehicles/actions/ListVehicleActionType";

const initState = {
  items: [],
  trendingItems: [],
  deals: [],
  filter: {
    page: 1,
    limit: 21,
    total: 20,
    priceStart: 0,
    priceEnd: 0,
    location :'',
    checkIn: '',
    checkOut: '',
    sortBy: ''
  }
};

const vehicle = (state = initState, action) => {
  console.log("check vehicle action :", action);

  switch (action.type) {
    case actionTypeVehicle.UPDATE_LIST_VEHICLE:
      return {
        ...state,
        items: action.data || [],
      };
    case actionTypeVehicle.UPDATE_LIST_VEHICLE_TRENDING:
      return {
        ...state,
        trendingItems: action.data,
      };
      case actionTypeVehicle.UPDATE_LIST_VEHICLE_DEAL:
        return {
          ...state,
          deals: action.data,
        };
      case 'CHANGE_FILTER_VEHICLE': 
        return {
          ...state, 
          filter: {
            ...state.filter,
            [action.key]: action.data
          }
        }
        case 'RESET_FILTER_VEHICLE': 
        return {
          ...state,
          filter: {
            page: 1,
            limit: 21,
            total: 20,
            priceStart: 0,
            priceEnd: 0,
            location :'',
            checkIn: '',
            checkOut: '',
            sortBy: '',
          }
        }
    default:
      return state;
  }
};

export default vehicle;
