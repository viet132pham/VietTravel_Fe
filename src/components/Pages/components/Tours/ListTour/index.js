/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import "../styles/ListTour.scss";
import Pagination from "../../../../commons/Pagination";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListFilterTour,
  getListTour,
} from "../actions/ListTourActionCallApi";
import {
  everageStar,
  handleConvertArr,
  handleEverageStar,
} from "../../../../commons/actions/actionCommons";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { addCartItem } from "../../Cart/actions/CartActionCallApi";
import { useLocation } from "react-router-dom";

const nf = new Intl.NumberFormat("en");

function ListTour(props) {
  const location = useLocation();
  const name = location.state?.name;
  const items = useSelector((state) => state.tour.items);
  const filter = useSelector((state) => state.tour.filter);
  const cartId = useSelector((state) => state.cart?.id);

  const [showType, setShowType] = useState("all");

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(name);
    if (name) {
      dispatch({
        type: "CHANGE_FILTER_TOUR",
        key: "name",
        data: name,
      });
      dispatch(getListFilterTour());
    } else {
      dispatch(getListTour(filter));
    }
  }, []);

  useEffect(() => {
    dispatch(getListFilterTour());
  }, [
    filter?.limit,
    filter?.name,
    filter?.priceStart,
    filter?.priceEnd,
    filter?.checkIn,
    filter?.checkOut,
    filter?.page,
    filter?.sortBy,
    filter?.sale,
  ]);

  const handleShowDetail = (id) => {
    history.push(`/tour/detail/${id}`);
  };
  const handleChangeSortType = (value) => {
    dispatch({
      type: "CHANGE_FILTER_TOUR",
      key: "sortBy",
      data: value,
    });
  };
  const handleAddCartItem = (e) => {
    const cartModel = {
      cartId: cartId,
      categoryName: "tour",
      categoryId: e?.id,
      name: e?.name,
      // price: Number(e?.price * (100 - e?.sale) / 100),
      price: Number(e?.price),
      quantity: 1,
    };
    dispatch(addCartItem(cartModel));
  };

  const handleClearFilter = () => {
    dispatch({
      type: "RESET_FILTER_TOUR",
    });
    dispatch(getListTour(filter));
  };

  const renderShowAll = () => {
    return items?.map((e) => {
      return (
        <div className="tour-item">
          <div className="image" onClick={() => handleShowDetail(e.id)}>
            <img src={e?.image || ""}></img>
            <div className="location d-flex">
              <div className="icon">
                <i className="fa-solid fa-location-dot fa-xl"></i>
              </div>
              <div className="text">{e?.name}</div>
            </div>
          </div>
          <div className="btn">
            <Button onClick={() => handleAddCartItem(e)}>
              Thêm vào giỏ hàng
            </Button>
          </div>

          <div className="rate">
            {handleConvertArr(Number(e?.hotel))?.map((item) => {
              return (
                <i
                  className="fa-solid fa-star"
                  style={{ color: "#b0d12b", marginRight: "3px" }}
                ></i>
              );
            })}
          </div>
          <div className="point-rate d-flex">
            <div className="point">{everageStar(e?.reviewsDTOS)}/ 10</div>
            <div className="view">
              ( {e?.reviewsDTOS?.length || 0} đánh giá )
            </div>
          </div>
          <div className="price">
            <div
              className={`org-price ${
                e?.sale > 0 ? "text-decoration-line-through" : ""
              }`}
            >
              Từ {nf.format(e?.price)} VNĐ
            </div>
            {e?.sale ? (
              <div className="price-sale">
                Giảm còn {nf.format((e?.price * (100 - e?.sale)) / 100)} VNĐ
              </div>
            ) : null}
          </div>
        </div>
      );
    });
  };

  const handleShowTime = (arr) => {
    const splits = arr?.split(";");
    return splits?.join(" ; ");
  };

  const renderShowList = () => {
    return items?.map((e) => {
      return (
        <div className="tour-item">
          <div className="image" onClick={() => handleShowDetail(e.id)}>
            <img src={e?.image || ""}></img>
            {e?.sale > 0 ? <div className="sale-i">Sale {e?.sale}%</div> : null}
          </div>
          <div className="right-content">
            <div className="col-1">
              <div className="name">{e?.name}</div>
              <div className="distance">
                <span>
                  <i class="fa-regular fa-clock"></i>
                </span>
                <span>Lịch trình:</span>
                <span>
                  {e?.locationStart} - {e?.locationEnd}
                </span>
              </div>
              <div className="info">
                <span>
                  <i class="fa-regular fa-clock"></i>
                </span>
                <span>Thời gian:</span>
                <span>
                  {e?.itineraries?.length} ngày - {e?.itineraries?.length - 1}{" "}
                  đêm
                </span>
              </div>
              <div className="info">
                <span>
                  <i class="fa-regular fa-calendar"></i>
                </span>
                <span>Khởi hành:</span>
                <span>{handleShowTime(e?.timeStart)}</span>
              </div>
              <div className="info">
                <span>
                  <i class="fa-solid fa-car"></i>
                </span>
                <span>Phương tiện:</span>
                <span>
                  {e?.locationStart} - {e?.locationEnd}
                </span>
              </div>
              <div className="info">
                <span>
                  <i class="fa-solid fa-house"></i>
                </span>
                <span>Khách sạn:</span>
                <span className="rate">
                  {handleConvertArr(Number(e?.hotel))?.map((item) => {
                    return (
                      <i
                        className="fa-solid fa-star"
                        style={{ color: "darkorange", marginRight: "3px" }}
                      ></i>
                    );
                  })}
                </span>
              </div>
            </div>
            <div className="col-2">
              <div className="price">
                <div className="text-align-center">Giá Tour</div>
                <div
                  className={`org-price ${
                    e?.sale > 0 ? "text-decoration-line-through" : ""
                  }`}
                >
                  {nf.format(e?.price)}đ
                </div>
                {e?.sale ? (
                  <div className="price-sale">
                    {nf.format((e?.price * (100 - e?.sale)) / 100)}đ
                  </div>
                ) : null}
              </div>
              <div className="btn-add">
                <button  onClick={() => handleAddCartItem(e)}>Đặt ngay</button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="list-tour-wrapper">
      <div className="title">
        <div className="text">Tour: {items?.length || 0} kết quả tìm thấy</div>
        <div className="d-flex">
          <div className="filter-reset" onClick={() => handleClearFilter()}>
            Xóa bộ lọc
          </div>
          <div className="" style={{ marginLeft: "24px" }}>
            <span
              style={{ marginRight: "10px" }}
              onClick={() => setShowType("all")}
            >
              <i class="fa-sharp fa-solid fa-border-all"></i>
            </span>
            <span onClick={() => setShowType("list")}>
              <i class="fa-solid fa-list"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="nav-link-filter">
        <div className="nav-item" onClick={() => handleChangeSortType("sale")}>
          Giảm giá
        </div>
        <div
          className="nav-item"
          onClick={() => handleChangeSortType("newest")}
        >
          Mới nhất
        </div>
        <div
          className="nav-item"
          onClick={() => handleChangeSortType("latest")}
        >
          Cũ nhất
        </div>
        <div
          className="nav-item"
          onClick={() => handleChangeSortType("low to hight")}
        >
          Giá: thấp đến cao
        </div>
        <div
          className="nav-item"
          onClick={() => handleChangeSortType("hight to low")}
        >
          Giá: cao đến thấp
        </div>
      </div>
      <div className={`list-items ${showType}`}>
        {showType === "all" ? renderShowAll() : renderShowList()}
      </div>
      <Pagination filter={filter} type="tour" />
    </div>
  );
}
export default ListTour;
