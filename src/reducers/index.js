import { combineReducers } from 'redux';
import auth from './auth';
import hotel from './hotel';
import tour from './tour';
import global from './global';
import cart from './cart';
import blog from './blog';

export default combineReducers({
  auth,
  hotel,
  tour,
  global,
  cart,
  blog
});
