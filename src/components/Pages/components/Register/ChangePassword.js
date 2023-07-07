import React, { useState } from "react";
import { Button, TextField, Box, dividerClasses } from "@mui/material";
import "../../styles/_changePassword.scss";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePassw } from "../../actions/login/LoginActionCallApi";
import { logout } from "../../actions/login/LoginAction";

function ChangePassword(props) {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewpassword, setReNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChangePasssw = () => {
    dispatch(updatePassw(oldPassword, newPassword, reNewpassword)).then(
      res => {
        if(res){
          logout();
          history.push("/login");
        } else {
          setMessage("Thay đổi mật khẩu thất bại");
        }
      }
    );
  };

  return (
    <div className="login-container">
      <Box className="change-password-form">
        <Box className="head">
          <ArrowCircleLeftOutlinedIcon style={{ color: "#3ab19b" }} onClick={() => history.push("/")} />
          <Box className="head_title">THAY ĐỔI MẬT KHẨU</Box>
        </Box>
        <Box className="new-password form-input" sx={{ mb: 2 }}>
          <Box className="txt-label">Mật khẩu cũ</Box>
          <TextField value={oldPassword} variant="outlined" type="password" onChange={e => setOldPassword(e.target.value)}/>
        </Box>
        <Box className="new-password form-input" sx={{ mb: 2 }}>
          <Box className="txt-label">Mật khẩu mới</Box>
          <TextField value={newPassword}  variant="outlined"  type="password" onChange={e => setNewPassword(e.target.value)}/>
        </Box>
        <Box className="new-password form-input">
          <Box className="txt-label">Mật khẩu mới (xác nhận)</Box>
          <TextField value={reNewpassword}  variant="outlined" type="password" onChange={e => setReNewPassword(e.target.value)}/>
        </Box>
        <Box className="btn">
          <Button
            variant="outlined"
            style={{
              borderRadius: 35,
              border: "none",
              backgroundColor: "#21b6ae",
              padding: "18px 36px",
              color: "white",
            }}
            className="reset-btn"
            onClick={() => handleChangePasssw()}
          >
            Xác nhận
          </Button>
        </Box>
      </Box>
    </div>
  );
}
export default ChangePassword;
