import React from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "../styles/FilterData/FilterTime.scss";
import { Button } from "@mui/material";
import { parseDateToString } from "../../../ulti/dateTime";

function FilterTime(props) {
  const {type } = props;

  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

  const dispatch = useDispatch();

  console.log("check dateStart :", parseDateToString(dateStart));
  
  const handleChangeTimeStart = (value, typeValue) => {
    dispatch({
      type: `CHANGE_FILTER_${typeValue}`,
      key: "checkIn",
      data: value,
    });
  };

  const handleChangeTimeEnd = (value, typeValue) => {
    dispatch({
      type: `CHANGE_FILTER_${typeValue}`,
      key: "checkOut",
      data: value,
    });
  };

  const handleChangeFilter = () => {
    switch (type) {
      case "hotel": {
        handleChangeTimeStart(parseDateToString(dateStart), 'HOTEL');
        handleChangeTimeEnd(parseDateToString(dateEnd), 'HOTEL');
        break;
      }
      case "tour": {
        handleChangeTimeStart(parseDateToString(dateStart), 'TOUR');
        handleChangeTimeEnd(parseDateToString(dateEnd), 'TOUR');
        break;
      }
      case "vehicle": {
        handleChangeTimeStart(parseDateToString(dateStart), 'VEHICLE');
        handleChangeTimeEnd(parseDateToString(dateEnd), 'VEHICLE');
        break;
      }
      default:
        return;
    }
  };

  return (
    <div className="filter-time-wrapper">
      <div className="title">Time for trip</div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="time-start mb-4">
          <DatePicker
            className="date__button"
            label="Start date"
            value={dateStart}
            onChange={(newValue) => {
              setDateStart(newValue);
            }}
            renderInput={(params) => (
              <TextField
                sx={{
                  "& fieldset": { border: "none" },
                }}
                {...params}
              />
            )}
          />
        </div>
        <div className="time-end">
          <DatePicker
            label="End date"
            className="date__button"
            value={dateEnd}
            onChange={(newValue) => {
              setDateEnd(newValue);
            }}
            renderInput={(params) => (
              <TextField
                sx={{
                  "& fieldset": { border: "none" },
                }}
                {...params}
              />
            )}
          />
        </div>
      </LocalizationProvider>
      <div className="search-btn d-flex justify-content-center">
        <Button variant="contained" className="mt-3" onClick={() => handleChangeFilter()}>Search</Button>
      </div>
    </div>
  );
}
export default FilterTime;
