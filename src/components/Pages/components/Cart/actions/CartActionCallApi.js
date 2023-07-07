import { BASE_URL } from "../../../../../contains/config"
import callApi from "../../../../../ulti/callApi";

export const addCartItem = (cartModel) => dispatch =>{
  const url = `${BASE_URL}/api/cartitem/post`;
  const options = {
    method: 'POST',
    data: JSON.stringify(cartModel)
  }

  return callApi(url, options).then(res => {
    console.log("check res?.data : ", res?.data);
  })
}

export const updateCart = (cartId, cartModel) => dispatch =>{
  const url = `${BASE_URL}/api/cart/put/${cartId}`;
  const options = {
    method: 'PUT',
    data: JSON.stringify(cartModel)
  }

  return callApi(url, options).then(res => {
    console.log("check res?.data : ", res?.data);
  })
}

export const getCartItems = (cartId) => dispatch => {
  const url = `${BASE_URL}/api/cart/getItems/${cartId}`;
  const options = {
    method: 'GET'
  }

  return callApi(url, options).then(res => {
    if(res?.data){
      dispatch({
        type: "UPDATE_CART_PROPERTIES",
        key: "items",
        value: res.data,
      });
    }
  })
}

export const changeCartItemProperties = (data) => ({
  type: 'UPDATE_CART_ITEM_PROPERTIES',
  data
});
export const deleteCartItemRedux = (data) => ({
  type: 'DELETE_CART_ITEM',
  data
});


export const updateCartItem = (quantity, itemId) => dispatch => {
  const url = `${BASE_URL}/api/cartitem/put/${quantity}/${itemId}`;
  const options = {
    method: 'PUT'
  }

  return callApi(url, options).then(res => {
    if(res?.data){
      console.log("check update cart item :", res?.data);
    }
  })
};

export const deleteCartItem = (id) => dispatch => {
  
  dispatch(deleteCartItemRedux(id));

  const url = `${BASE_URL}/api/cartitem/delete/${id}`;

  const options = {
    method: 'DELETE'
  }

  return callApi(url, options).then(res => {
    if(res?.data){
    }
  })
};

export const deleteAllCartItem = (cartId) => dispatch => {

  const url = `${BASE_URL}/api/cartitem/delete_all/${cartId}`;

  const options = {
    method: 'DELETE'
  }

  return callApi(url, options).then(res => {
    if(res?.data){
    }
  })
}