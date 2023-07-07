import { Radio } from "@material-ui/core";
import FormControlLabel from "@mui/material/FormControlLabel";
import "../styles/FilterData/FilterSale.scss";
import React from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

function FilterSale(props) {

  const {sales, type} = props;

  const [saleSelect, setSaleSelect] = useState(0);

  const dispatch = useDispatch();

  const handleSelectRadio = (e) => {
    setSaleSelect(e.target.value);
    handleChangeFilter(e.target.value);
  };

  const saleArr = useMemo(() => {
    const saleModel = sales?.filter(e => e > 0)?.map((item, index) => {
      return {
        value: item, 
        id: index
      }
    } )
    return saleModel;
  }, [sales]);

  const handleChangeFilter = (value) => {
    switch (type) {
      case "hotel": {
        dispatch({
          type: "CHANGE_FILTER_HOTEL",
          key: "sale",
          data: value,
        });
        break;
      }
      case "tour": {
        dispatch({
          type: "CHANGE_FILTER_TOUR",
          key: "sale",
          data: value,
        });
        break;
      }
      case "vehicle": {
        dispatch({
          type: "CHANGE_FILTER_VEHICLE",
          key: "sale",
          data: value,
        });
        break;
      }
      default:
        return;
    }
  };


  return (
    <div className={`sale-wrapper`}>
      <div className="title">Hot Sale</div>
      <div className="sale-list">
        {saleArr?.map((e, index) => {
          return (
            <div className={`sale-item`} key={index}>
              <FormControlLabel
                value={e.value}
                control={
                  <Radio
                    checked={e.value === Number(saleSelect)}
                    onChange={(e) => handleSelectRadio(e)}
                  />
                }
                label={`${e.value}%`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default FilterSale;
