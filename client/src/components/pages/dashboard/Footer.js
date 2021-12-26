import React from "react";
import "./Footer.css";

export default function Footer(props) {
  return (
    <div className="footer">
      <div className="left_side">
        <div>
          <h1 style={{ fontSize: "14px" }}>
            CitizenV - Hệ thống điều tra dân số
          </h1>
        </div>

        <div>Thông tin liên hệ</div>
        <div>Email: dangnamlss@gmail.com.</div>
      </div>
      <div className="right_side">
        <div>Nhóm phát triển: Cường - Mạnh - Nam</div>
        <div>ĐH Công Nghệ - Đại Học Quốc Gia Hà Nội</div>
      </div>
    </div>
  );
}
