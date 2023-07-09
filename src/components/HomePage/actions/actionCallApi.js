import axios from "axios";
import { BASE_URL } from "../../../contains/config";
import callApi from "../../../ulti/callApi";
import { updateListDestination, updateTourTrending, updateVehicleTrending } from "./actionRedux";


export const getDestinationItems = () => dispatch => {
  const options = {
    method: 'GET'
  }
  const url =  `${BASE_URL}/api/location/find/topdestination`;

  return axios.get(url, options).then(res => {
    if(res?.data){
      dispatch(updateListDestination(res.data));
    }
  });
};

export const getTourTrending = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/tour/find/trending`;

  return axios.get(url, options).then(res => {
    if(res?.data){
      dispatch(updateTourTrending(res.data));
    }
  });
};

export const search = (type, name) => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/${type}/search/${name}`;

  return axios.get(url, options).then(res => {
    if(res?.data){
      dispatch(updateTourTrending(res.data));
    }
  });
};


export const getVehicleTrending = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/vehicle/find/trending`;

  return axios.get(url, options).then(res => {
    if(res?.data){
      dispatch(updateVehicleTrending(res.data));
    }
  });
} 

export const getVehicleTopDeal = () => dispatch => {
  const options = {
    method: 'GET'
  }
  const url =  `${BASE_URL}/api/vehicle/find/top_deal`;

  return axios.get(url, options).then(res => {
    if(res?.data){
      dispatch(updateTourTrending(res.data));
    }
  });
} 