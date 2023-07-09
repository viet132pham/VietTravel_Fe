

export const updateListDestination = (data) => dispatch => {
  dispatch({
    type: 'UPDATE_DESTINATION_ITEMS',
    data
  })
};

export const updateTourTrending = (data) => dispatch => {
  dispatch({
    type: 'UPDATE_LIST_TOUR_TRENDING',
    data
  })
}
export const updateVehicleTrending = (data) => dispatch => {
  dispatch({
    type: 'UPDATE_LIST_VEHICLE_TRENDING',
    data
  })
}