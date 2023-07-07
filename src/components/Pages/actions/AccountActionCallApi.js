import axios from "axios";
import { BASE_URL } from "../../../contains/config";
import jwt_decode from "jwt-decode";
import { updateUser } from "./AccountActionRedux";
import callApi from "../../../ulti/callApi";

export const register = (registerRequest) => (dispatch) => {
  const url = `${BASE_URL}/api/register`;

  return axios.post(url, registerRequest).then((res) => {
    if (res.status === 200) {
      return res?.data;
    }
  });
};

export const login = (loginRequest) => (dispatch) => {
  const url = `${BASE_URL}/api/login`;

  return axios.post(url, loginRequest).then((res) => {
    if (res.status === 200) {
      if (res?.data?.token) {
        sessionStorage.setItem("token", res.data.token);
        const username = jwt_decode(JSON.stringify(res.data.token))?.sub;
        const id = jwt_decode(JSON.stringify(res.data.token))?.id;
        const role = jwt_decode(JSON.stringify(res.data.token))?.role;
        const account = {
          username: username,
          userId: id,
          userRole: role,
        };
        dispatch(updateUser(account));
        dispatch(getCartByUser(id));
        // initCart(id);
        return true;
      }
      else {
        console.log("check error: ", res.data);
      }
      return false;
    }
    else {
      console.log("check error: ", res.data);
    }
  });
};

export const initCart = (userId) => (dispatch) => {
  const url = `${BASE_URL}/api/cart/post`;

  const cartModel = {
    status: "WAITING",
    userId: userId,
  };

  const options = {
    method: "POST",
    data: JSON.stringify(cartModel),
  };
  return callApi(url, options).then((res) => {
    if (res?.data?.id) {
      dispatch({
        type: "UPDATE_CART_PROPERTIES",
        key: "id",
        value: res.data.id,
      });
    }
  });
};

export const getCartByUser = (userId) => (dispatch) => {
  const url = `${BASE_URL}/api/cart/get/${userId}`;
  const options = {
    method: "GET",
  };
  return callApi(url, options).then((res) => {
    if(res?.data?.id) {
      dispatch({
        type: "UPDATE_CART_PROPERTIES",
        key: "id",
        value: Number(res.data.id),
      });
    } else {
      dispatch(initCart(userId));
    }
    return res?.data;
  });
};
