import React from "react";
import "../styles/TopDestinationStyle.scss";
import { useSelector } from "react-redux";

function TopDestination(props) {

  const items = useSelector(state => state.global.destinationItems);

  return (
    <div className="top-destination">
      <div className="destination-wrapper">
        <div className="title d-flex justify-content-center">Điểm đến hàng đầu</div>
        <div className="divide-1"></div>
        <div className="list-destination">
          {items?.map((e, index) => {
            return (
              <div className={`destination-item item-${index}`} style={{backgroundImage: `url(${e?.locationImage})`, backgroundSize: 'cover'}}>
                <div className="location">{e?.locationName}</div>
                <div className="divide"></div>
                <div className="services">
                  <div className="hotel">
                    {e?.totalHotel} Khách sạn
                  </div>
                  <div className="tour">
                    {e?.totalTour} Tour
                  </div>
                  {/* <div className="vehicle">
                    {e?.totalVehicle} Vehicle
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default TopDestination;

