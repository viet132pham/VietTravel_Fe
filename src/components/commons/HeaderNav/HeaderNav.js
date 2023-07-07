import React, { useState } from "react";
import "../styles/HeaderNav/HeaderNav.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRef } from "react";
import { useEffect } from "react";
import logo from "./logo.png";

function HeaderNav(props) {
  const { handleOpenLoginForm, handleOpenRegisterForm } = props;

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownAccount, setShowDropDownAccount] = useState(false);

  const accountRef = useRef();

  const pageRef = useRef();

  const account = useSelector((state) => state.auth.account);

  const dispatch = useDispatch();
  const history = useHistory();
  const CustomSnackbar = (props) => (
    <Snackbar
      autoHideDuration={4000}
      open={showSnackbar}
      onClose={onCloseClickHandler}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      children={props.children}
    ></Snackbar>
  );

  const onCloseClickHandler = (event) => {
    setShowSnackbar(false);
  };

  const handleRedirectPage = (pageUrl) => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        history.push(`/${pageUrl}`);
      } else {
        setShowAlert(true);
        setShowSnackbar(true);
      }
    } catch (e) {
      setShowAlert(true);
      setShowSnackbar(true);
      history.push(`/`);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    dispatch({ type: "RESET_AUTH" });
    history.push("/");
  };

  const handleProfile = () => {
    history.push("/profile");
  };


  const renderDropdown = () => {
    return (
      <div className="dropdown-wrapper">
        <div onClick={() => handleRedirectPage("blog")}>Bài viết</div>
        <div>About us</div>
        <div>Contact us</div>
      </div>
    );
  };

  const renderDropdownAccount = () => {
    return (
      <div className="dropdown-account-wrapper">
        <div onClick={() => handleProfile()}>Thông tin cá nhân</div>
        <div onClick={() => handleLogout()}>Đăng xuất</div>
      </div>
    );
  };

  const useOutsideAccount = (accountRef) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          accountRef.current &&
          !accountRef.current.contains(event.target) &&
          !showDropDownAccount
        ) {
          setShowDropDownAccount(!setShowDropDownAccount);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [accountRef]);
  };
  const useOutsidePage = (pageRef) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          pageRef.current &&
          !pageRef.current.contains(event.target) &&
          !showDropDown
        ) {
          setShowDropDown(!setShowDropDown);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [pageRef]);
  };
  useOutsideAccount(accountRef);
  useOutsidePage(pageRef);

  return (
    <div className="header-nav-wrapper">
      <div className="nav-bar-top d-flex">
        <div className="nav-bar left d-flex">
          <div className="phone">(024) 2242 0777</div>
          <div className="email"> vietpt@travel.com.vn</div>
        </div>
        <div className="nav-bar right d-flex">
          {account?.username ? (
            <div className="d-flex">
              <div
                className="account d-flex"
                ref={accountRef}
                onClick={() => setShowDropDownAccount(!showDropDownAccount)}
              >
                <div className="avatar mr-2">
                  <i
                    className="fa-solid fa-user"
                    style={{ color: "#0F1824" }}
                  ></i>
                </div>
                <div className="ml-2 d-flex align-items-center text-uppercase">
                  {account.username}
                </div>
                {showDropDownAccount ? renderDropdownAccount() : null}
              </div>
            </div>
          ) : (
            <>
              <div style={{fontWeight: "500"}} className="login" onClick={() => handleOpenLoginForm()}>
                Đăng nhập
              </div>
              <div style={{fontWeight: "500"}}
                className="register"
                onClick={() => handleOpenRegisterForm()}
              >
                Đăng ký
              </div>
            </>
          )}
        </div>
      </div>
      <div className="nav-bar-bottom">
        <div className="nav-bar left">
          <img style={{width: "50px"}} src={logo}/>
          VietTravel
          </div>
        <div className="nav-bar right">
          <div onClick={() => history.push("")}>Trang chủ</div>
          <div onClick={() => handleRedirectPage("hotel")}>Khách sạn</div>
          <div onClick={() => handleRedirectPage("tour")}>Tour</div>
          {/* <div onClick={() => handleRedirectPage("vehicle")}>Vehicle</div> */}
          <div onClick={() => handleRedirectPage("blog")}>Bài viết</div>
          <div style={{width: "100px"}} onClick={() => handleRedirectPage("")}>Về chúng tôi</div>
          {/* <div
            className="div-page"
            ref={pageRef}
            onClick={() => setShowDropDown(!showDropDown)}
          >
            <div className="d-flex">
              <span style={{ marginRight: "8px" }}>Page</span>
              <span>
                <i className="fa-solid fa-chevron-down"></i>
              </span>
            </div>
            {showDropDown ? renderDropdown() : null}
          </div> */}
          <div className="shopping" onClick={() => handleRedirectPage("cart")}>
          <i class="fa-solid fa-cart-shopping" style={{fontSize: '20px'}}></i>
          </div>
        </div>
      </div>
      {showAlert ? (
        <CustomSnackbar>
          <Alert severity="error">Đã xảy ra lỗi, vui lòng đăng nhập trước</Alert>
        </CustomSnackbar>
      ) : null}
    </div>
  );
}
export default HeaderNav;
