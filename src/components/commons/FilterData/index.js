import React from "react";
import "../styles/FilterData/FilterData.scss"
import FilterLocation from "./FilterLocation";
import FilterPrice from "./FilterPrice";
import FilterTime from "./FilterTime";
import FilterSale from "./FilterSale";
import { memo } from "react";

function FilterData (props){

  const {sales, type} = props;

  return (
    <div className="filter-wrapper">
      <FilterLocation type={type} />
      <FilterPrice type={type} />
      {/* <FilterTime type={type}/> */}
      { sales?.filter(e => e && e > 0)?.length > 0?
      <FilterSale sales={sales} type={type}/> : null }
    </div>
  )
}
export default memo(FilterData);