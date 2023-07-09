import React, { useState } from "react";
import Header from "./Header";
import Contents from "./Contents.js";
import Footer from "./Footer";
import Login from "../Pages/components/Login";
import Register from "../Pages/components/Register";

function HomePage(props) {
  const [showPopupLogin, setShowPopupLogin] = useState(false);
  const [showPopupRegister, setShowPopupRegister] = useState(false);

  const handleOpenLoginForm = () => {
    setShowPopupLogin(true);
    setShowPopupRegister(false);
  };

  const handleOpenRegisterForm = () => {
    setShowPopupLogin(false);
    setShowPopupRegister(true);
  };

  return (
    <>
      <Header
        handleOpenLoginForm={handleOpenLoginForm}
        handleOpenRegisterForm={handleOpenRegisterForm}
      />
      <Contents />
      <hr />
      <Footer />
      {showPopupLogin ? (
        <Login
          open={showPopupLogin}
          handleClose={() => setShowPopupLogin(false)}
          handleOpenRegisterForm={handleOpenRegisterForm}
        />
      ) : null}
      {showPopupRegister ? (
        <Register
          open={showPopupRegister}
          handleClose={() => setShowPopupRegister(false)}
          handleOpenLoginForm={handleOpenLoginForm}
        />
      ) : null}
    </>
  );
}
export default HomePage;
