import React, { useEffect, useState } from "react";
import store from './store/store';
import jwt_decode from "jwt-decode";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { useSelector, Provider, useDispatch } from "react-redux";
import HomePage from "./components/HomePage";
import Hotels from "./components/Pages/components/Hotels";
import { updateUser } from "./components/Pages/actions/AccountActionRedux";
import Tours from "./components/Pages/components/Tours";
import ItemHotelDetail from "./components/Pages/components/Hotels/ListHotel/ItemHotelDetail";
import ItemTourDetail from "./components/Pages/components/Tours/ListTour/ItemTourDetail";
import Blog from "./components/Pages/components/Blogs/components";
import BlogDetail from "./components/Pages/components/Blogs/components/BlogDetail";
import Cart from "./components/Pages/components/Cart/components";
import Profile from "./components/Pages/components/Profile";

function App() {
  const checkAuth = useSelector(state => state?.auth?.positionCallApiCheckAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const token = sessionStorage.getItem('token');
      const username = jwt_decode(JSON.stringify(token))?.sub;
      const id = jwt_decode(JSON.stringify(token))?.id;
      const role = jwt_decode(JSON.stringify(token))?.role;
      const account = {
        username: username,
        userId: id,
        userRole: role,
      };
      dispatch(updateUser(account));
    }
    catch(e) {
      // setUser('');
    }
  
  }, [checkAuth]);

  return (
    <Provider store={store} >
      <Router> 
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={HomePage}></Route>       
            <Route exact path="/hotel" component={Hotels}></Route>   
            <Route exact path="/tour" component={Tours}></Route>
            <Route exact path="/hotel/detail/:id" component={ItemHotelDetail}></Route>
            <Route exact path="/tour/detail/:id" component={ItemTourDetail}></Route>
            <Route exact path="/blog/detail/:id" component={BlogDetail}></Route>
            <Route exact path="/blog" component={Blog}></Route>
            <Route exact path="/cart" component={Cart}></Route>
            <Route exact path="/profile" component={Profile}></Route>
          </Switch>
        </React.Fragment> 
       
      </Router>
    </Provider>
  );
}

export default App;
