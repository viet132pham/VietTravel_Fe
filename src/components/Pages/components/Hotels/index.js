import React from "react";  
import { withRouter } from "react-router-dom";
import HeaderNav from "../../../commons/HeaderNav/HeaderNav";
import ListHotel from "./ListHotel";
import "./styles/index.scss";
import FilterData from "../../../commons/FilterData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSaleHotel } from "./actions/ListHotelActionCallApi";
import { useState } from "react";

function Hotels (props){

  const [sales, setSales] = useState([]);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getSaleHotel()).then(res => setSales(res));
  }, []);
  return (
    <div className="hotels-wrapper">
      <HeaderNav />
      <hr />
      <div className="hotel-content-wrapper">
        <FilterData sales={sales} type="hotel" />
        <ListHotel />
      </div>
    </div>
  )
}
export default withRouter(Hotels);