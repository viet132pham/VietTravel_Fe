import React from "react";
import "../styles/FooterStyle.scss";

function Footer(props) {
  return (
    <div className="footer-wrapper">
      <div className="footer-content d-flex">
        <div>
          <div className="contact-wrapper">
            <div className="title">Cần Hỗ Trợ?</div>
            <div>Có câu hỏi? Gọi cho chúng tôi 24/7! Số điện thoại: (024) 2242 0777</div>
            <div className="font-weight-600">Thông tin liên hệ</div>
            <div>Toà B1, Đại học Bách Khoa Hà Nội</div>
          </div>
          <div className="company-wrapper">
            <div className="title">Công ty</div>
            <div>Về chúng tôi</div>
            <div>Cơ hội nghề nghiệp</div>
            <div>Điều khoản sử dụng</div>
            <div>Chính sách bảo mật</div>
            <div>Gửi phản hồi cho chúng tôi</div>
          </div>
          <div className="other-service-wrapper">
            <div className="title">Dịch vụ khác</div>
            <div>Quan hệ cổ đông</div>
            <div>Chương trình thưởng</div>
            <div>PointsPLUS</div>
            <div>Đối tác</div>
            <div>Đăng ký khách sạn của tôi</div>
          </div>
          <div className="support-wrapper">
            <div className="title">Hỗ trợ</div>
            <div>Tài khoản</div>
            <div>Quy định</div>
            <div>Quy định</div>
            <div>Chương trình liên kết</div>
            <div>Chính sách bảo mật</div>
          </div>
          <div className="mail-list">
            <div className="title">Danh sách thư</div>
            <div>
              Đăng ký danh sách thư của chúng tôi để nhận cập nhật và ưu đãi mới nhất.
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 mb-5">
        <hr />
      </div>
      <div className="d-flex justify-content-center mb-4"><p>&copy; 2023 VietTravel.com.vn by Phạm Tuấn Việt</p></div>
    </div>
  );
}

export default Footer;
