import React from "react";
import "../styles/TopDealsStyle.scss";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { truncate } from "lodash";

function TodayTopDeals(props) {
  const hotelDeal = useSelector(state => state.hotel.deals);
  const tourDeal = useSelector(state => state.tour.deals);

  const MAX_DESCRIPTION_LENGTH = 100; // Độ dài tối đa của mô tả

  return (
    <div className="top-deals">
      <div className="top-deals-wrapper">
        <div className="title d-flex justify-content-center">
          Ưu đãi hàng đầu hôm nay
        </div>
        <div className="divide-1"></div>
        <div className="list-deal">
          {tourDeal?.map(e => {
            const truncatedDescription = truncate(e?.description, {
              length: MAX_DESCRIPTION_LENGTH,
            });

            return (
              <div className="banner-wrapper">
                <div className="banner-image">
                  <img
                    src={e.image}
                    alt="banner"
                    onError={e => {
                      e.target.onerror = null;
                    }}
                  />
                </div>
                <div className="name">{e?.name}</div>
                <div className="description">{truncatedDescription}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TodayTopDeals;
