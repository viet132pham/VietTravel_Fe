import React from "react";
import "../styles/HeaderStyle.scss";
import Search from "./Search";
import HeaderNav from "../../commons/HeaderNav/HeaderNav";

function Header (props) {

  const { handleOpenRegisterForm, handleOpenLoginForm } = props;

  return(
    <div className="header-wrapper">
      <HeaderNav handleOpenRegisterForm={handleOpenRegisterForm} handleOpenLoginForm={handleOpenLoginForm} />
      <div className="slogan">
        <div className="content">Cùng du lịch Việt Nam với VietTravel nào !</div>
        <div className="sub-content">Tìm khách sạn và các tour tuyệt vời tại VietTravel nhé !</div>
      </div>
      <Search />
    </div>
  )
}
export default Header;