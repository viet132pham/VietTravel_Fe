import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import "../../styles/_forgetPassword.scss";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useHistory } from "react-router-dom";

function ForgetPassword(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChangeForm, setIsChangeForm] = useState(0);
  const history = useHistory();

  const handleChangeForm = (idForm) => {
    setIsChangeForm(idForm);
  };

  const renderConfirmPassCode = () => {
    return (
      <div className="login-container">
        <Box className="forget-password-form">
          <Box className="head">
            <ArrowCircleLeftOutlinedIcon
              style={{ color: "#21b6ae" }}
              onClick={() => handleChangeForm(0)}
            />
            <Box className="head_title">CẤP LẠI MẬT KHẨU</Box>
          </Box>
          <Box className="email form-input">
            <Box className="txt-label">Mã xác nhận</Box>
            <TextField variant="outlined" />
          </Box>
          <Box className="btn">
            <Button
              variant="outlined"
              className="forget-btn"
              style={{
                borderRadius: 35,
                border: "none",
                backgroundColor: "#21b6ae",
                padding: "18px 36px",
                color: "white",
              }}
              onClick={() => handleChangeForm(2)}
            >
              Tiếp
            </Button>
          </Box>
        </Box>
      </div>
    );
  };

  const renderGetPassCode = () => {
    return (
      <div className="login-container">
        <Box className="forget-password-form">
          <Box className="head">
            <ArrowCircleLeftOutlinedIcon
              style={{ color: "#21b6ae" }}
              onClick={() => history.push("/login")}
            />
            <Box className="head_title">CẤP LẠI MẬT KHẨU</Box>
          </Box>
          <Box className="email form-input">
            <Box className="txt-label">Email</Box>
            <TextField variant="outlined" />
          </Box>
          <Box className="btn">
            <Button
              variant="outlined"
              className="forget-btn"
              style={{
                borderRadius: 35,
                border: "none",
                backgroundColor: "#21b6ae",
                padding: "18px 36px",
                color: "white",
              }}
              onClick={() => handleChangeForm(1)}
            >
              Tiếp
            </Button>
          </Box>
        </Box>
      </div>
    );
  };

  const renderChangePassword = () => {
    return (
      <div className="login-container">
        <Box className="change-password-form">
          <Box className="head">
            <ArrowCircleLeftOutlinedIcon onClick={() => handleChangeForm(1)} />
            <Box className="head_title">CẤP LẠI MẬT KHẨU</Box>
          </Box>
          <Box className="new-password form-input" sx={{ mb: 2 }}>
            <Box className="txt-label">Mật khẩu mới</Box>
            <TextField variant="outlined" />
          </Box>
          <Box className="password form-input">
            <Box className="txt-label">Xác nhận mật khẩu mới</Box>
            <TextField variant="outlined" />
          </Box>
          <Box className="btn">
            <Button
              variant="outlined"
              className="reset-btn"
              style={{
                borderRadius: 35,
                border: "none",
                backgroundColor: "#21b6ae",
                padding: "18px 36px",
                color: "white",
              }}
              onClick={() => history.push("/login")}
            >
              Xác nhận
            </Button>
          </Box>
        </Box>
      </div>
    );
  };
  return isChangeForm === 0
    ? renderGetPassCode()
    : isChangeForm === 1
    ? renderConfirmPassCode()
    : renderChangePassword();
}
export default ForgetPassword;
