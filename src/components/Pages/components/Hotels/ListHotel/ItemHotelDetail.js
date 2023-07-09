/* eslint-disable react/style-prop-object */
import React from "react";
import HeaderNav from "../../../../commons/HeaderNav/HeaderNav";
import "../styles/Detail.scss";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotelDetailItem } from "../actions/ListHotelActionCallApi";
import { useState } from "react";
import Footer from "../../../../HomePage/Footer";
import {
  handleConvertArr,
  handleEverageStar,
} from "../../../../commons/actions/actionCommons";
import { Button } from "@mui/material";
import { addCartItem } from "../../Cart/actions/CartActionCallApi";
import { hotelBenefits } from "../commons/DataCommon";
import { getCartByUser } from "../../../actions/AccountActionCallApi";
const nf = new Intl.NumberFormat("en");

function ItemHotelDetail(props) {
  const [item, setItem] = useState({});
  const history = useHistory();
  const cartId = useSelector((state) => state.cart?.id);
  const account = useSelector(state => state.auth.account);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartByUser(account?.userId));
    const path = history.location.pathname;
    const id = path?.split("/hotel/detail/")?.[1];
    dispatch(getHotelDetailItem(id)).then((res) => {
      setItem(res);
      console.log("check res :", res);
    });
  }, []);

  const handleAddCartItem = (e) => {
    const cartModel = {
      cartId: cartId,
      categoryName: "room",
      categoryId: e?.id,
      name: e?.name,
      // price: Number(e?.price * (100 - e?.sale) / 100),
      price: Number(e?.price),
      quantity: 1,
    };
    dispatch(addCartItem(cartModel));
  };

  const renderListRoom = () => {
    return item?.rooms?.map((e) => {
      return (
        <div className="room-item">
          <div className="image">
            <img src={e?.image || ""}></img>
          </div>
          <div className="right-content">
            <div className="col-1">
              <div className="name">{e?.name}</div>
              <div
                className="desc-top d-flex justify-content-between"
                style={{ marginTop: "12px" }}
              >
                <div style={{ width: "30%" }}>
                  <span style={{ marginRight: "8px" }}>
                    <i class="fa-solid fa-bed"></i>
                  </span>
                  <span>{e?.bed}</span>
                </div>
                <div style={{ width: "30%" }}>
                  <span style={{ marginRight: "8px" }}>
                    <i class="fa-solid fa-users"></i>
                  </span>
                  <span>{e?.numberGuest} khách</span>
                </div>
                <div style={{ width: "30%", color: "#FF4d4d" }}>
                  <span>({e?.roomBlank} phòng trống)</span>
                </div>
              </div>
              <hr />
              <div className="desc-list">
                {e?.amenityrooms?.map((it) => {
                  return <div className="sub-col">{it?.name}</div>;
                })}
              </div>
            </div>
            <div className="col-2">
              <div className="price">
                <div className="text-align-center">Giá phòng</div>
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
                <button onClick={() => handleAddCartItem(e)}>Đặt ngay</button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderListBenefit = (listBenefit, type, id) => {
    return (
      <div className="item">
        <div className="type">
          <span style={{ marginRight: "8px" }}>
            {id === 1 ? <i class="fa-solid fa-house-flag"></i> : null}
            {id === 2 ? (
              <i class="fa-solid fa-house-medical-circle-check"></i>
            ) : null}
            {id === 3 ? <i class="fa-solid fa-house-user"></i> : null}
            {id === 4 ? <i class="fa-solid fa-hotel"></i> : null}
            {id === 5 ? <i class="fa-solid fa-bowl-food"></i> : null}
            {id === 6 ? <i class="fa-sharp fa-solid fa-car"></i> : null}
            {id === 7 ? <i class="fa-solid fa-house-flag"></i> : null}
            {id === 8 ? <i class="fa-solid fa-house-laptop"></i> : null}
            {id === 9 ? <i class="fa-solid fa-motorcycle"></i> : null}
            {id === 10 ? <i class="fa-solid fa-house-flag"></i> : null}
            {id === 11 ? <i class="fa-solid fa-wifi"></i> : null}
          </span>
          <span>{type}</span>
        </div>
        <div>
          <ul>
            {listBenefit
              ?.filter((obj) => obj.title === type)
              ?.map((it) => (
                <li>{it?.name}</li>
              ))}
          </ul>
        </div>
      </div>
    );
  };

  const handleChangeText = (text) => {
    console.log("Check text :", text);
    console.log("Check replaceAll :", text?.replaceAll(" ", "%20"));
    return text?.replaceAll(" ", "%20");
  };

  return (
    <div className="hotel-detail-wrapper">
      <HeaderNav />
      <hr />
      <div className="hotel-detail-content-wrapper">
        <div className="bread-scrum d-flex">
          <div className="text" onClick={() => history.push("/")}>
            Trang chủ >{" "}
          </div>
          <div className="text" onClick={() => history.push("/hotel")}>
            Khách sạn
          </div>
          <div className="text">> Chi tiết </div>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-xl-9">
              <div className="product">
                <div className="d-block d-md-flex flex-center-between align-items-start mb-2">
                  <div className="w-100 d-flex justify-content-between">
                    <div className="mb-3">
                      <div className="d-block d-md-flex flex-horizontal-center mb-2 mb-md-0">
                        <h4 className="font-size-23 font-weight-bold mb-1">
                          {item?.name}
                        </h4>
                        <div className="ml-3 font-size-10 letter-spacing-2 d-flex align-items-center">
                          {handleConvertArr(Number(item?.star) || 0)?.map(
                            (item) => {
                              return (
                                <i
                                  className="fa-solid fa-star"
                                  style={{
                                    color: "#b0d12b",
                                    marginRight: "3px",
                                  }}
                                ></i>
                              );
                            }
                          )}
                        </div>
                      </div>
                      <div className="d-block d-md-flex flex-horizontal-center font-size-14 text-gray-1 sub-description">
                        <i className="fa-solid fa-location-dot mr-2 font-size-20"></i>
                        <div>{item?.address}</div>
                      </div>
                    </div>
                    {/* <div>
                      <Button
                        variant="container"
                        onClick={() => handleAddCartItem(item)}
                      >
                        Thêm vào giỏ hàng
                      </Button>
                    </div> */}
                  </div>
                </div>
                <div className="pb-4 mb-2">
                  <img src={item?.image}></img>
                </div>
                <div className="single-hotel__description border-bottom">
                  <h5 className="text-dark font-weight-bold description-title">
                    Mô tả
                  </h5>
                  <div className="description">{item?.description}</div>

                  <div className="policy d-flex mt-4">
                    <div
                      className="label-1 success "
                      style={{ minWidth: "fit-content", color: "#0088FF" }}
                    >
                      <span style={{ marginRight: "12px" }}>
                        <i class="fa-solid fa-circle-check"></i>
                      </span>
                      <span>Chính sách lưu trú</span>
                    </div>
                    <div className="list-desc">
                      <ul>
                        {item?.rules?.map((e) => (
                          <li>
                            {e?.title} - {e?.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div
                    className="list-landmark mt-4 mb-3"
                    style={{
                      border: "1px solid #d3d5d7",
                      padding: "16px 24px",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      className="label mb-3"
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#0088FF",
                      }}
                    >
                      Thông tin khu vực
                    </div>
                    <div className="contents d-flex">
                      <div className="maps">
                        <iframe
                          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1147952503716!2d105.84028307498075!3d21.02809228062099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab1ca9d23345%3A0xac4a8a5947723e1f!2s${handleChangeText(
                            item?.name
                          )}!5e0!3m2!1svi!2s!4v1688257380036!5m2!1svi!2s`}
                          width="350"
                          height="300"
                          style={{ borderRadius: "16px" }}
                          allowfullscreen=""
                          loading="lazy"
                          referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                      <div
                        className="area-vicinity "
                        style={{
                          marginLeft: "60px",
                          width: "calc(100% - 360px)",
                        }}
                      >
                        <div
                          className="label"
                          style={{ fontWeight: "700", fontSize: "18px" }}
                        >
                          Các địa điểm lân cận
                        </div>
                        {item?.landmarks?.map((e) => {
                          return (
                            <div className="name d-flex justify-content-between mt-1 mb-2">
                              <div style={{ fontWeight: "500" }}>{e?.name}</div>
                              <div>{e?.distance}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <hr />
                  <div className="list-room">{renderListRoom()}</div>
                  <div className="list-review">
                    <div
                      className="label mb-2"
                      style={{
                        color: "#555",
                        fontWeight: "600",
                        fontSize: "20px",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "12px",
                          color: "orangered",
                          fontSize: "20px",
                        }}
                      >
                        <i class="fa-solid fa-comments"></i>
                      </span>
                      <span>Đánh giá từ người dùng</span>
                    </div>
                    {item?.reviews?.map((e) => {
                      return (
                        <div
                          className="review-item mt-4 d-flex"
                          style={{ marginLeft: "36px" }}
                        >
                          <div
                            className="image"
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "50%",
                              backgroundSize: "cover",
                            }}
                          >
                            <img src={e?.image}></img>
                          </div>
                          <div
                            className="review-content"
                            style={{ marginLeft: "16px" }}
                          >
                            <div className="name" style={{ fontWeight: "600" }}>
                              {e?.user?.username}
                            </div>
                            <div className="created-at mt-1 mb-1">
                              {e?.createdAt}
                            </div>
                            <div className="rate">
                              <span
                                style={{
                                  background: "#0088FF",
                                  borderRadius: "4px",
                                  color: "#fff",
                                  padding: "1px 8px",
                                }}
                              >
                                {e?.star} / 5
                              </span>
                              <span style={{ marginLeft: "12px" }}>
                                {e?.content}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="benefit-title">Tiện ích chung</div>
                  <div className="list-benefit">
                    {renderListBenefit(
                      item?.amenityhotels,
                      hotelBenefits[0].type,
                      1
                    )}
                    {renderListBenefit(
                      item?.amenityhotels,
                      hotelBenefits[1].type,
                      2
                    )}
                    {renderListBenefit(
                      item?.amenityhotels,
                      hotelBenefits[2].type,
                      3
                    )}
                    {renderListBenefit(
                      item?.amenityhotels,
                      hotelBenefits[3].type,
                      4
                    )}
                    {renderListBenefit(
                      item?.amenityhotels,
                      hotelBenefits[4].type,
                      5
                    )}
                    {renderListBenefit(
                      item?.amenityhotels,
                      hotelBenefits[5].type,
                      6
                    )}
                    {renderListBenefit(
                      item?.amenityhotels,
                      hotelBenefits[6].type,
                      7
                    )}
                    {renderListBenefit(
                      item?.amenityhotels,
                      hotelBenefits[7].type,
                      8
                    )}
                    {renderListBenefit(
                      item?.amenityhotels,
                      hotelBenefits[8].type,
                      9
                    )}
                    {renderListBenefit(
                      item?.amenityhotels,
                      hotelBenefits[9].type,
                      10
                    )}
                    {renderListBenefit(
                      item?.amenityhotels,
                      hotelBenefits[10].type,
                      11
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default ItemHotelDetail;
