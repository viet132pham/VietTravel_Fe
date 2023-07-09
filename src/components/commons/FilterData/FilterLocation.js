import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import "../styles/FilterData/FilterLocaton.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";

function FilterLocation(props) {
  const { type } = props;
  const [nameValue, setNameValue] = useState("");

  const handleFilterLocation = (e) => {
    setNameValue(e.target.value);
  };

  const dispatch = useDispatch();

  const handleChangeFilter = () => {
    switch (type) {
      case "blog": {
        dispatch({
          type: "CHANGE_FILTER_BLOG",
          key: "name",
          data: nameValue,
        });
        break;
      }
      case "hotel": {
        dispatch({
          type: "CHANGE_FILTER_HOTEL",
          key: "name",
          data: nameValue,
        });
        break;
      }
      case "tour": {
        dispatch({
          type: "CHANGE_FILTER_TOUR",
          key: "name",
          data: nameValue,
        });
        break;
      }
      case "vehicle": {
        dispatch({
          type: "CHANGE_FILTER_VEHICLE",
          key: "name",
          data: nameValue,
        });
        break;
      }
      default:
        return;
    }
  };

  return (
    <div className="filter-location-wrapper">
      <div className="title">Nơi bạn muốn đến</div>
      <div className="input-field">
        <input
          type="text"
          onChange={(e) => handleFilterLocation(e)}
          value={nameValue}
        />
      </div>
      <div className="d-flex justify-content-center">
        <button onClick={() => handleChangeFilter()}>Tìm kiếm</button>
      </div>
    </div>
  );
}
export default FilterLocation;
