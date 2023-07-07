
import * as actionsHotelType from './ListHotelActionType';

export const updateListHotel = (data) => dispatch => {
  dispatch({
    type: actionsHotelType.UPDATE_LIST_HOTEL,
    data
  })
}

export const updateListHotelTrending = (data) => dispatch => {
  dispatch({
    type: actionsHotelType.UPDATE_LIST_HOTEL_TRENDING,
    data
  })
}

export const updateListHotelDeal = (data) => dispatch => {
  dispatch({
    type: actionsHotelType.UPDATE_LIST_HOTEL_DEAL,
    data
  })
}