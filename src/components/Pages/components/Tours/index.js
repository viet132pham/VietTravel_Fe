import React from "react";  
import { withRouter } from "react-router-dom";
import HeaderNav from "../../../commons/HeaderNav/HeaderNav";
import ListTour from "./ListTour";
import "./styles/index.scss";
import FilterData from "../../../commons/FilterData";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSaleTour } from "./actions/ListTourActionCallApi";
import { useState } from "react";

function Tours (props){

  const [sales, setSales] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSaleTour()).then(res => setSales(res));
  }, []);

  return (
    <div className="tours-wrapper">
      <HeaderNav />
      <hr />
      <div className="tour-content-wrapper">
        <FilterData sales={sales} type="tour" />
        <ListTour />
      </div>
    </div>
  )
}
export default withRouter(Tours);