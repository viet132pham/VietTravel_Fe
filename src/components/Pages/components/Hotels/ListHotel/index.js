/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import "../styles/ListHotel.scss";
import Pagination from "../../../../commons/Pagination";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListHotel,
  getListFilterHotel,
} from "../actions/ListHotelActionCallApi";
import { useHistory } from "react-router-dom";
import {
  everageStar,
  handleConvertArr,
} from "../../../../commons/actions/actionCommons";
import { Button } from "@mui/material";
import { addCartItem } from "../../Cart/actions/CartActionCallApi";
import { useLocation } from "react-router-dom";

const nf = new Intl.NumberFormat("en");

function ListHotel(props) {
  const location = useLocation();
  const name = location.state?.name;
  const dispatch = useDispatch();

  const history = useHistory();

  const cartId = useSelector((state) => state.cart?.id);

  const items = useSelector((state) => state.hotel.items);

  const filter = useSelector((state) => state.hotel.filter);

  const [showType, setShowType] = useState("all");

  useEffect(() => {
    console.log(name);
    if (name) {
      dispatch({
        type: "CHANGE_FILTER_HOTEL",
        key: "name",
        data: name,
      });
      dispatch(getListFilterHotel());
    } else {
      dispatch(getListHotel(filter));
    }
  }, []);

  useEffect(() => {
    dispatch(getListFilterHotel());
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
    history.push(`/hotel/detail/${id}`);
  };

  const handleChangeSortType = (value) => {
    dispatch({
      type: "CHANGE_FILTER_HOTEL",
      key: "sortBy",
      data: value,
    });
  };

  const handleAddCartItem = (e) => {
    const cartModel = {
      cartId: cartId,
      categoryName: "hotel",
      categoryId: e?.id,
      name: e?.name,
      price: Number(e?.price),
      quantity: 1,
    };
    dispatch(addCartItem(cartModel));
  };

  const handleClearFilter = () => {
    dispatch({
      type: "RESET_FILTER_HOTEL",
    });
    dispatch(getListHotel(filter));
  };

  const renderShowAll = () => {
    return items?.map((e) => {
      return (
        <div className="hotel-item">
          <div className="image" onClick={() => handleShowDetail(e.id)}>
            <img src={e.image}></img>
            <div className="location d-flex">
              <div className="icon">
                <i className="fa-solid fa-location-dot fa-xl"></i>
              </div>
              <div className="text">{e?.name}</div>
            </div>
          </div>
          {/* <div className="btn">
            <Button onClick={() => handleAddCartItem(e)}>
              Thêm vào giỏ hàng
            </Button>
          </div> */}
          <div className="rate">
            {handleConvertArr(Number(e?.star) || 0)?.map((item) => {
              return (
                <i
                  className="fa-solid fa-star"
                  style={{ color: "darkorange", marginRight: "3px" }}
                ></i>
              );
            })}
          </div>
          <div className="point-rate d-flex">
            <div className="point">{everageStar(e?.reviewsDTOS)}.0/5.0</div>
            <div className="view">( {e?.reviews?.length || 0} đánh giá )</div>
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

  const renderShowList = () => {
    return items?.map((e) => {
      return (
        <div className="hotel-item">
          <div className="image" onClick={() => handleShowDetail(e.id)}>
            <img src={e?.image || ""}></img>
            {e?.sale > 0 ? <div className="sale-i">Sale {e?.sale}%</div> : null}
          </div>
          <div className="right-content">
            <div className="col-1">
              <div className="name">{e?.name} </div>
              <div className="name">{e?.address} </div>
              <div className="distance">
                <span>
                  <i></i>
                </span>
                <span>Số phòng:</span>
                <span>
                  <i class={`fa-solid fa-${e?.rooms?.length}`}></i>
                </span>
              </div>
              <div className="info">
                <span>
                  <i class="fa-solid fa-house"></i>
                </span>
                <span>Chất lượng:</span>
                <span className="rate">
                  {handleConvertArr(Number(e?.star) || 0)?.map((item) => {
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
              {/* <div className="btn-add">
                <button onClick={() => handleAddCartItem(e)}>Đặt ngay</button>
              </div> */}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="list-hotel-wrapper">
      <div className="title">
        <div className="text">
          Khách sạn: {items?.length || 0} kết quả tìm thấy
        </div>
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
      <Pagination filter={filter} type="hotel" />
    </div>
  );
}
export default ListHotel;
