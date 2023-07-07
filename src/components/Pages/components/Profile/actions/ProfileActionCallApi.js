import jwt_decode from "jwt-decode";
import { BASE_URL } from "../../../../../contains/config";
import callApi from "../../../../../ulti/callApi";


export const getUserById = () => (dispatch, getState) => {

  const {auth: {
    account: {
      userId
    }
  }} = getState();
  let id = userId;
  if(!id) {
    id = jwt_decode(JSON.stringify(sessionStorage.getItem("token")))?.id;
  }
  const url = `${BASE_URL}/api/user/get/${id}`;
  const options = {
    method: 'GET'
  }

  return callApi(url, options).then((res) => {
    if (res?.data) {
      console.log("check res.data :", res.data);
      return res?.data;
    }
  });
};

export const updateProfile = (model) => (dispatch, getState) => {

  const {auth: {
    account: {
      userId
    }
  }} = getState();
  const url = `${BASE_URL}/api/user/update/info/${userId}`;
  const options = {
    method: 'PUT',
    data: JSON.stringify(model)
  }

  return callApi(url, options).then((res) => {
    if (res) {
      return res;
    }
  });
};

export const updatePassword = (model) => (dispatch, getState) => {

  const {auth: {
    account: {
      userId
    }
  }} = getState();
  const url = `${BASE_URL}/api/user/update/password/${userId}`;
  const options = {
    method: 'PUT',
    data: JSON.stringify(model)
  }

  return callApi(url, options).then((res) => {
    if (res) {
      return res;
    }
  });
};

export const getListOrderedByUser = () => (dispatch, getState) => {

  const {auth: {
    account: {
      userId
    }
  }} = getState();

  const url = `${BASE_URL}/api/cart/get_list_ordered/${userId}`;
  const options = {
    method: 'GET'
  }

  return callApi(url, options).then((res) => {
    if (res?.data) {
      console.log("check res.data order:", res.data);
      return res?.data;
    }
  });
};