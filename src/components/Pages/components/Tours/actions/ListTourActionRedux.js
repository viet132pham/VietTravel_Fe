
import * as actionTourType from "./ListTourActionActionType";

export const updateListTour = (data) => dispatch => {
  dispatch({
    type: actionTourType.UPDATE_LIST_TOUR,
    data
  })
};

export const updateListTourTrending = (data) => dispatch => {
  dispatch({
    type: actionTourType.UPDATE_LIST_TOUR_TRENDING,
    data
  })
}

export const updateListTourDeal = (data) => dispatch => {
  dispatch({
    type: actionTourType.UPDATE_LIST_TOUR_DEAL,
    data
  })
}