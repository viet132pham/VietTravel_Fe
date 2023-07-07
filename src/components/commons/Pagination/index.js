import * as React from "react";
import Pagination from "@mui/material/Pagination";
import "../styles/PaginationCommon.scss";
import { useDispatch } from "react-redux";

function PaginationCommon(props) {
  const { filter, type } = props;
  const dispatch = useDispatch();

  const handleChangeFilterPage = (newPage) => {
    switch (type) {
      case "blog": {
        dispatch({
          type: "CHANGE_FILTER_BLOG",
          key: "page",
          data: newPage,
        });
        break;
      }
      case "hotel": {
        dispatch({
          type: "CHANGE_FILTER_HOTEL",
          key: "page",
          data: newPage,
        });
        break;
      }
      case "tour": {
        dispatch({
          type: "CHANGE_FILTER_TOUR",
          key: "page",
          data: newPage,
        });
        break;
      }
      case "vehicle": {
        dispatch({
          type: "CHANGE_FILTER_VEHICLE",
          key: "page",
          data: newPage,
        });
        break;
      }
      default:
        return;
    }
  };

  return (
    <div className="pagination-wrapper">
      <div className="show-total">Total result: {filter.total}</div>
      <div className="show-page">
        <Pagination
          count={Math.round(filter.total / filter.limit)}
          variant="outlined"
          shape="rounded"
          onChange={(value, page) => handleChangeFilterPage(page)}
        />
      </div>
    </div>
  );
}
export default PaginationCommon;
