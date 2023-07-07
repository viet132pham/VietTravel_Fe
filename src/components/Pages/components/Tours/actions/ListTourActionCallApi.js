import axios from "axios";
import { BASE_URL } from "../../../../../contains/config"
import callApi from "../../../../../ulti/callApi";
import { updateListTour, updateListTourTrending, updateListTourDeal } from "./ListTourActionRedux";

export const getListTour = (filter) => dispatch => {
  const options = {
    method: 'GET'
  }

  const url = `${BASE_URL}/api/tour/list_pagination_dto?pageNumber=${filter.page}&pageSize=${filter.limit}`;
  
  return callApi(url, options).then(res => {
    if(res?.data){
      if(res?.data?.totalElements){
        dispatch({type: 'CHANGE_FILTER_TOUR', key: 'total', data: res.data.totalElements});
      }
      dispatch(updateListTour(res.data?.content));
    }
  });

}

export const getListFilterTour = () => (dispatch, getState) => {

  const {
    tour: {
      filter
    }
  } = getState();

  const options = {
    method: 'GET'
  }

  let url = `${BASE_URL}/api/tour/filter?pageNumber=${filter.page}&pageSize=${filter.limit}`;
  
  if(filter?.name){
    url = url + `&name=${filter.name}`;
  }
  if(filter?.sale){
    url = url + `&sale=${filter.sale}`;
  }
  if(filter?.priceStart){
    url = url + `&priceStart=${filter.priceStart}`;
  }
  if(filter?.priceEnd){
    url = url + `&priceEnd=${filter.priceEnd}`;
  }
  if(filter?.checkIn){
    url = url + `&checkIn=${filter.checkIn}`;
  }
  if(filter?.checkOut){
    url = url + `&checkOut=${filter.checkOut}`;
  }
  if(filter?.sortBy){
    url = url + `&sortBy=${filter.sortBy}`;
  }
  return callApi(url, options).then(res => {
    if(res?.data){
      if(res?.data?.totalElements){
        dispatch({type: 'CHANGE_FILTER_TOUR',key: 'total',  data: res.data.totalElements});
      }
      dispatch(updateListTour(res.data?.content));
    }
  });
}


export const getTourTrendingItems = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/tour/find/trending`;

  return axios.get(url, options).then(res => {
    if(res?.data){
      dispatch(updateListTourTrending(res.data));
      return res.data;
    }
  });
} 
export const getTourDeals = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/tour/find/top_deal`;

  return axios.get(url, options).then(res => {
    if(res?.data){
      dispatch(updateListTourDeal(res.data));
      return res.data;
    }
  });
};

export const getSaleTour = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url = `${BASE_URL}/api/tour/get/sale_value`;
  
  return callApi(url, options).then(res => {
    if(res?.data){
      return res?.data;
    }
  });
};

export const getTourDetailItem = (id) => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/tour/${id}`;

  return callApi(url, options).then(res => {
    if(res?.data){
      return res.data;
    }
  });
}