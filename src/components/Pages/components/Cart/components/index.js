import React, { useEffect, useMemo, useState } from "react";
import HeaderNav from "../../../../commons/HeaderNav/HeaderNav";
import Footer from "../../../../HomePage/Footer";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import "../styles/index.scss";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  changeCartItemProperties,
  deleteAllCartItem,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../actions/CartActionCallApi";
import { useHistory } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";

const nf = new Intl.NumberFormat("en");

function Cart(props) {
  const [checkAll, setCheckAll] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [unCheckList, setUnCheckList] = useState([]);
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);

  const cart = useSelector((state) => state.cart);

  const history = useHistory();
  const dispatch = useDispatch();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const onCloseClickHandler = (event) => {
    setShowSnackbar(false);
  };

  const CustomSnackbar = (props) => (
    <Snackbar
      autoHideDuration={2000}
      open={showSnackbar}
      onClose={onCloseClickHandler}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      children={props.children}
    ></Snackbar>
  );

  useEffect(() => {
    try {
      const search = new URLSearchParams(history.location.search);
      const idParam = search?.get("id");
      history.push(`/cart?id=${cart?.id || idParam}`);
      if (!cart?.id) {
        dispatch({
          type: "UPDATE_CART_PROPERTIES",
          key: "id",
          value: cart?.id || idParam,
        });
      }

      dispatch(getCartItems(cart?.id || idParam));
    } catch (e) {}
  }, []);

  const handleChangeQuantityItem = (cartItem, value) => {
    if (cartItem.quantity + value === 0) {
      return;
    }
    const item = {
      ...cartItem,
      quantity: cartItem.quantity + value,
    };
    dispatch(changeCartItemProperties(item));
    dispatch(updateCartItem(cartItem.quantity + value, cartItem.id));
  };

  const handleDeleteCartItem = (id) => {
    dispatch(deleteCartItem(id));
  };
  const handleDeleteAllCartItem = (id) => {
    dispatch({
      type: "UPDATE_CART_PROPERTIES",
      key: "items",
      value: [],
    });
    dispatch(deleteAllCartItem(cart?.id));
  };
  const handleCheckAll = () => {
    if (checkAll) {
      setCheckAll(false);
      setCheckList([]);
    } else {
      setCheckAll(true);
      const ids = cart?.items?.map((e) => e.id);
      setCheckList(ids);
    }
  };

  const handleCheckItem = (id) => {
    if (checkList?.includes(id)) {
      const newCheckList = checkList?.filter((e) => e !== id);
      setCheckList(newCheckList);
    } else {
      setCheckList(checkList.concat(id));
    }
  };

  const handleTotalPrice = useMemo(() => {
    const cartSelect = cart?.items?.filter((e) => checkList?.includes(e.id));
    let price = 0;
    const temp = cartSelect?.map((e) => {
      price += e.quantity * (e.price - e?.sale);
    });
    return price;
  }, [checkList]);

  const handleCheckOut = () => {
    const c = cart?.items
      ?.map((e) => e.id)
      .filter((id) => !checkList.includes(id));
    setUnCheckList(c.filter((id) => !checkList.includes(id)));
    if (checkList?.length === 0) {
      setShowAlert(true);
      setShowSnackbar(true);
    } else {
      setOpenCheckoutModal(true);
    }
  };

  return (
    <>
      <div className="cart-wrapper">
        <HeaderNav />
        <hr />
        <div className="cart-content">
          <div className="cart-table">
            <div className="cart-header">
              <div className="header_top">
                <div className="text-cart">Giỏ hàng</div>
                <div
                  className="text-action"
                  onClick={() => handleDeleteAllCartItem()}
                >
                  <span>
                    <i class="fa-solid fa-trash"></i>
                  </span>
                  <span>Xóa</span>
                </div>
              </div>
              <div className="header_bottom">
                <div className="text-product">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkAll}
                        onChange={() => handleCheckAll()}
                      />
                    }
                    label="Product"
                  />
                </div>
                <div className="text-quantity">Số lượng</div>
                <div className="text-price">Giá</div>
              </div>
            </div>
            {console.log("check cart :", cart?.items)}
            <div className="cart-body">
              {cart?.items?.map((e) => {
                return (
                  <div className="cart-item">
                    <div className="text-product">
                      <span>
                        <input
                          type="checkbox"
                          checked={checkList?.includes(e.id)}
                          onChange={() => handleCheckItem(e.id)}
                        ></input>
                      </span>
                      <span>
                        <img src={e?.image}></img>
                      </span>
                      <span>{e?.name}</span>
                    </div>
                    <div className="text-quantity">
                      <div className="">
                        <div className="box">
                          <span onClick={() => handleChangeQuantityItem(e, -1)}>
                            <i class="fa-solid fa-minus"></i>
                          </span>
                          <span>{e?.quantity}</span>
                          <span onClick={() => handleChangeQuantityItem(e, 1)}>
                            <i class="fa-solid fa-plus"></i>
                          </span>
                        </div>
                        <div
                          className="remove-item"
                          onClick={() => handleDeleteCartItem(e.id)}
                        >
                          <span>
                            <i class="fa-solid fa-trash"></i>
                          </span>
                          <span>Xóa</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-price d-block text-align-end">
                      {console.log("check e :", e)}
                      <div  style={{
                          marginLeft: "10px",
                          fontWeight: "400",
                          color: "#666",
                          textDecoration: e?.sale ? "line-through" : '',
                        }}>{nf.format(e?.price * e?.quantity)} VNĐ
                      </div>

                      {e?.sale ? 
                      <div
                        style={{
                          marginLeft: "10px",
                          fontWeight: "400",
                          color: "#Ff4d4d",
                        }}
                      >
                        {nf.format(e?.price * (100 - e?.sale) / 100 * e?.quantity)} VNĐ
                      </div>
                     : null }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="checkout-box">
            {/* <div className="total">
              <div className="text">Subtotal</div>
              <div className="value">{handleTotalPrice}</div>
            </div> */}
            <div className="checkout">
              <div>
                <div className="text">Tổng tiền</div>
                <div className="value">{handleTotalPrice}</div>
              </div>
              <Button onClick={() => handleCheckOut()}>Thanh toán</Button>
            </div>
          </div>
        </div>
        <hr />
        <Footer />
      </div>
      {openCheckoutModal ? (
        <CheckoutModal
          checkList={checkList}
          handleTotalPrice={handleTotalPrice}
          open={openCheckoutModal}
          handleClose={() => setOpenCheckoutModal(false)}
          unCheckList={unCheckList}
        />
      ) : null}
      {showAlert ? (
        <CustomSnackbar>
          <Alert severity="error">
            Vui lòng chọn dịch vụ trước khi thanh toán
          </Alert>
        </CustomSnackbar>
      ) : null}
    </>
  );
}
export default Cart;
