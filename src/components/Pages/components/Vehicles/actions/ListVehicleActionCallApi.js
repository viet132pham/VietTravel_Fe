import axios from "axios";
import { BASE_URL } from "../../../../../contains/config"
import callApi from "../../../../../ulti/callApi";
import { updateListVehicle, updateListVehicleDeal, updateListVehicleTrending } from "./ListVehicleActionRedux";

export const getListVehicle = (filter) => dispatch => {
  const options = {
    method: 'GET'
  }
  const url = `${BASE_URL}/api/vehicle/list_pagination_dto?pageNumber=${filter.page}&pageSize=${filter.limit}`;
  
  return callApi(url, options).then(res => {
    if(res?.data){
      if(res?.data?.totalElements){
        dispatch({type: 'CHANGE_FILTER_VEHICLE',key: 'total', data: res.data.totalElements});
      }
      dispatch(updateListVehicle(res.data?.content));
    }
  });

};

export const getListFilterVehicle = () => (dispatch, getState) => {

  const {
    vehicle: {
      filter
    }
  } = getState();

  const options = {
    method: 'GET'
  }

  let url = `${BASE_URL}/api/vehicle/filter?pageNumber=${filter.page}&pageSize=${filter.limit}`;
  
  if(filter?.location){
    url = url + `&location=${filter.location}`;
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
        dispatch({type: 'CHANGE_FILTER_VEHICLE',key: 'total',  data: res.data.totalElements});
      }
      dispatch(updateListVehicle(res.data?.content));
    }
  });
}

export const getVehicleTrendingItems = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/vehicle/find/trending`;

  return callApi(url, options).then(res => {
    if(res?.data){
      dispatch(updateListVehicleTrending(res.data));
    }
  });
};

export const getVehicleDealItems = () => dispatch => {
  const options = {
    method: 'GET'
  }
  const url =  `${BASE_URL}/api/vehicle/find/top_deal`;

  return axios.get(url, options).then(res => {
    if(res?.data){
      dispatch(updateListVehicleDeal(res.data));
    }
  });
};

export const getSaleVehicle = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url = `${BASE_URL}/api/vehicle/get/sale_value`;
  
  return callApi(url, options).then(res => {
    if(res?.data){
      return res?.data;
    }
  });
};

export const getVehicleDetailItem = (id) => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/vehicle/${id}`;

  return callApi(url, options).then(res => {
    if(res?.data){
      return res.data;
    }
  });
}