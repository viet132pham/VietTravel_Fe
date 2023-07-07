import React from "react";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import "../styles/FilterData/FilterPrice.scss";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

const nf = new Intl.NumberFormat('en');

function FilterPrice(props) {

  const { type } = props;

  const dispatch = useDispatch();
  const [value, setValue] = useState([0, 100]);

  const valuetext = (value) => {
    return `${value}$`;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePriceStart = (value, typeValue) => {
    dispatch({
      type: `CHANGE_FILTER_${typeValue}`,
      key: "priceStart",
      data: value * 100000,
    });
  }
  const handleChangePriceEnd = (value, typeValue) => {
    dispatch({
      type: `CHANGE_FILTER_${typeValue}`,
      key: "priceEnd",
      data: value * 100000,
    });
  }
  const handleChangeFilter = () => {
    switch (type) {
      case "hotel": {
        handleChangePriceStart(value[0], 'HOTEL');
        handleChangePriceEnd(value[1], 'HOTEL');
        break;
      }
      case "tour": {
        handleChangePriceStart(value[0], 'TOUR');
        handleChangePriceEnd(value[1], 'TOUR');
        break;
      }
      case "vehicle": {
        handleChangePriceStart(value[0], 'TOUR');
        handleChangePriceEnd(value[1], 'TOUR');
        break;
      }
      default:
        return;
    }
  };
  return (
    <div className="filter-price-range">
      <div className="label">Phạm vi giá tiền </div>
      <div className="value mb-2">
        <span>{nf.format(value[0] * 100000)}đ</span>
        &nbsp; - &nbsp;
        <span>{nf.format(value[1] * 100000)}đ</span>
      </div>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      <div className="d-flex justify-content-center mt-4 mb-2">
        <button  onClick={() => handleChangeFilter()}>Tìm kiếm</button>
      </div>

    </div>
  );
}
export default FilterPrice;
