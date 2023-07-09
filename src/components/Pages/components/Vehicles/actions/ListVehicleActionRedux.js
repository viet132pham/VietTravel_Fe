
import * as actionTourType from "./ListVehicleActionType";

export const updateListVehicle = (data) => dispatch => {
  dispatch({
    type: actionTourType.UPDATE_LIST_VEHICLE,
    data
  })
}

export const updateListVehicleTrending = (data) => dispatch => {
  dispatch({
    type: actionTourType.UPDATE_LIST_VEHICLE_TRENDING,
    data
  })
};
export const updateListVehicleDeal = (data) => dispatch => {
  dispatch({
    type: actionTourType.UPDATE_LIST_VEHICLE_DEAL,
    data
  })
};


