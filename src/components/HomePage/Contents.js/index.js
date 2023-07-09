import React from "react";
import TopDestination from "./TopDestination";
import "../styles/ContentWrapperStyle.scss";
import Trending from "./Trending";
import TodayTopDeals from "./TodayTopDeals";
import TravelTip from "./TraverTip";
import WhyChoose from "./WhyChoose";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDestinationItems, getTourTrending, getVehicleTrending } from "../actions/actionCallApi";
import { getHotelDeal } from "../../Pages/components/Hotels/actions/ListHotelActionCallApi";
import { getTourDeals } from "../../Pages/components/Tours/actions/ListTourActionCallApi";

function Contents(props){

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDestinationItems());
    dispatch(getTourTrending());
    dispatch(getVehicleTrending());
    dispatch(getHotelDeal());
    dispatch(getTourDeals());
  }, []);

  return (
    <div className="content-wrapper">
      <TopDestination />
      <div className="mt-5 mb-5">
        <hr/>
      </div>
      <Trending />
      <TravelTip />
      <WhyChoose />
      <div className="mt-4 mb-4">
        <hr/>
      </div>
      <TodayTopDeals />
    </div>
  )
}
export default Contents;