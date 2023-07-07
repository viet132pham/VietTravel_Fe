import React from "react";  
import { withRouter } from "react-router-dom";
import HeaderNav from "../../../commons/HeaderNav/HeaderNav";
import ListVehicle from "./ListVehicle";
import "./styles/index.scss";
import FilterData from "../../../commons/FilterData";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSaleVehicle } from "./actions/ListVehicleActionCallApi";

function Vehicles (props){

  const [sales, setSales] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSaleVehicle()).then(res => setSales(res));
  }, []);

  return (
    <div className="hotels-wrapper">
      <HeaderNav />
      <hr />
      <div className="hotel-content-wrapper">
        <FilterData sales={sales} type="vehicle" />
        <ListVehicle />
      </div>
    </div>
  )
}
export default withRouter(Vehicles);