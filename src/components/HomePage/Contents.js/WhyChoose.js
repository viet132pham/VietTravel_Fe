import React from "react";
import "../styles/WhyChoose.scss";

function WhyChoose(props) {
  return (
    <div className="benefit-wrapper">
      <div className="benefit-content">
        <div className="title">Tại sao chọn chúng tôi</div>
        <div className="divide-1"></div>
        <div className="list-benefit d-flex">
          <div className="benefit-item benefit-1">
            <div className="icon"><i className="fa-solid fa-tag"></i></div>
            <div className="title-1">Giá cả cạnh tranh</div>
            <div className="title-2">
              Với hơn 500 nhà cung cấp và sức mua của 300 triệu thành viên, viettravel.com.vn có thể giúp bạn tiết kiệm hơn!
            </div>
          </div>
          <div className="benefit-item benefit-2">
            <div className="icon"><i className="fa-solid fa-earth-europe"></i></div>
            <div className="title-1">Trải nghiệm du lịch tuyệt vời</div>
            <div className="title-2">
              Với các tour du lịch tại Việt Nam, bạn sẽ có cơ hội khám phá những cảnh đẹp tuyệt vời và trải nghiệm văn hóa độc đáo của đất nước chúng tôi.
            </div>
          </div>
          <div className="benefit-item benefit-3">
            <div className="icon"><i className="fa-solid fa-earth-europe"></i></div>
            <div className="title-1">Chất lượng dịch vụ</div>
            <div className="title-2">
              Chúng tôi cam kết cung cấp dịch vụ chất lượng cao, đảm bảo rằng bạn có một kỳ nghỉ tuyệt vời và đáng nhớ khi du lịch tại Việt Nam.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChoose;
