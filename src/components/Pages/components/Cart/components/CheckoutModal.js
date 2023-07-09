import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { useState } from "react";
import "../styles/CheckoutModal.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCart,
  deleteCartItem,
} from "../../Cart/actions/CartActionCallApi";
import { initCart, getCartByUser } from "../../../actions/AccountActionCallApi";
import QRCodes from "./QRCodes";
import { useHistory } from "react-router-dom";


const nf = new Intl.NumberFormat("en");

function CheckoutModal(props) {
  const { open, handleClose, checkList, handleTotalPrice, unCheckList } = props;
  const [openResult, setOpenResult] = useState(false);
  const cartId = useSelector((state) => state.cart?.id);
  const items = useSelector((state) => state.cart?.items);
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth.account);

  const [email, setEmail] = useState(auth?.email || "");
  const [fullName, setFullName] = useState();
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("method1");

  const itemsSelect = useMemo(() => {
    return items?.filter((e) => checkList?.includes(e.id));
  }, [checkList, items]);

  const handlePayment = (totalPrice) => {
    setOpenResult(true);

    unCheckList?.map((e) => {
      console.log(e);
      dispatch(deleteCartItem(e));
    });
    const cartModel = {
      userId: auth.userId,
      priceTotal: totalPrice,
      paymentMethod: "CASH DELIVERY",
      status: "PROCESS",
    };
    dispatch(updateCart(cartId, cartModel));
    dispatch(initCart(auth.userId));
    dispatch(getCartByUser(auth.userId));
  };

  const handleCloseModal = () => {
    history.push("/");
    setOpenResult(false);
    handleClose();
  };

  const renderResultCheckout = () => {
    return (
      <Dialog open={openResult} className="dialog-result">
        <DialogTitle>
          <Box className="title-result">
            <i class="fa-sharp fa-solid fa-circle-check"></i>
            <p>Cảm ơn vì đã chọn chúng tôi cho chuyến đi của bạn </p>
          </Box>
          <Box className="text-send-mail">
            Xác nhận thông tin đã được gửi đến email của bạn
          </Box>
        </DialogTitle>
        <DialogActions className="d-flex justify-content-center">
          <Button color="error" onClick={() => handleCloseModal()}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (open && openResult) {
    return renderResultCheckout();
  }

  return (
    <Dialog open={open} className="dialog-checkout" maxWidth="lg">
      <DialogTitle className="checkout-title">
        <Typography className="text-align-center">LỰA CHỌN CỦA BẠN</Typography>
      </DialogTitle>
      <DialogContent>
        <div className="contents d-flex justify-content-between">
          <div className="user-info">
            <div className="email">
              <div className="label">Email</div>
              <div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="fullName">
              <div className="label">Họ tên đầy đủ</div>
              <div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="phone">
              <div className="label">Số điện thoại</div>
              <div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="payment-method">
              <div className="label">
                <span>Lựa chọn phương thức thanh toán</span>
                <span
                  style={{
                    color: "#ff4d4d",
                    fontSize: "18px",
                    marginLeft: "4px",
                  }}
                >
                  {" "}
                  *
                </span>
              </div>
              <div className="radios">
                <div className="radio-item">
                  <span>
                    <input
                      type="radio"
                      checked={paymentMethod === "methodCOD"}
                      onChange={() => setPaymentMethod("methodCOD")}
                    ></input>
                  </span>
                  <span>Thanh toán COD</span>
                </div>
                <div className="radio-item">
                  <span>
                    <input
                      type="radio"
                      checked={paymentMethod === "methodTrasf"}
                      onChange={() => setPaymentMethod("methodTrasf")}
                    ></input>
                  </span>
                  <span>Chuyển khoản</span>
                </div>
                <div className="radio-item">
                  <span>
                    <input
                      type="radio"
                      checked={paymentMethod === "methodQR"}
                      onChange={() => setPaymentMethod("methodQR")}
                    ></input>
                  </span>
                  <span>Thanh toán qua QR code</span>
                </div>
                {paymentMethod === "methodQR" ? 
                <QRCodes /> : null}
              </div>
            </div>
          </div>
          <div className="product">
            <Box className="list-items">
              {itemsSelect?.map((e) => {
                return (
                  <Box className="item">
                    <Box className="image">
                      <img src={e?.image}></img>
                    </Box>
                    <Box className="name">
                      <Box className="text">{e?.name}</Box>
                      <Box className="mt-3">x{e?.quantity}</Box>
                    </Box>
                    <Box className="price">
                      {nf.format((e?.price - e?.sale) * e.quantity)} VNĐ
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Box className="total-price">
              <Box>
                <Box className="text">Tổng tiền</Box>
                <Box className="value">{nf.format(handleTotalPrice)} VNĐ</Box>
              </Box>
            </Box>
          </div>
        </div>
      </DialogContent>
      {/* <DialogActions> */}
      <div className="list-btn-action">
        <button onClick={() => handleClose()}>Thoát</button>
        <button onClick={() => handlePayment(handleTotalPrice)}>
          Xác nhận thanh toán
        </button>
      </div>

      {/* </DialogActions> */}
    </Dialog>
  );
}
export default CheckoutModal;
