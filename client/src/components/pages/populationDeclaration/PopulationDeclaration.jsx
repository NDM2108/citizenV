// import { useContext, useState, useRef } from "react";
import "./popuDeclaration.css";


const PopulationDeclaration = () => {

  return (
    <div className="container-declaration">
      <div className="title"> Nhập liệu về dân số</div>
      <form className="form-declaration">
        <div className="info">
          <div className="inputBox">
            <span className="details"> Họ và tên</span>
            <input
              name="name"
              type="text"
              required
            // value={data.name}

            />
          </div>

          <div className="inputBox">
            <span className="details"> Ngày sinh</span>
            <input
              name="DOB"
              type="date"
              required
            />
          </div>

          <div className="inputBox">
            <span className="details"> Số CCCD/CMND</span>
            <input
              name="CCCD"
              type="text"
              required
            // value={data.CCCD}
            />
          </div>

          <div className="inputBox">
            <span className="details"> Quê quán</span>
            <input
              name="idAddress"
              type="text"
              required
            // value={data.idAddress}
            />
          </div>

          <div className="inputBox">
            <span className="details"> Địa chỉ thường trú</span>
            <input
              name="idAddress"
              type="text"
              required
            // value={data.idAddress}
            />
          </div>

          <div className="inputBox">
            <span className="details"> Địa chỉ tạm trú</span>
            <input
              name="idAddress"
              type="text"
              required
            // value={data.idAddress}
            />
          </div>

          <div className="inputBox">
            <span className="details">Trình độ học vấn</span>
            <input
              name="academicLevel"
              type="text"
              required
            // value={data.academicLevel}
            />
          </div>

          <div className="inputBox">
            <span className="details">Nghề nghiệp</span>
            <input
              name="job"
              type="text"
              required
            />
          </div>

          <div className="inputBox">
            <span className="details">Tôn giáo</span>
            <input
              name="religion"
              type="text"
              required
            // value={data.religion}
            />
          </div>
        </div>

        <div className="gender-info">
          <input
            type="radio"
            name="sex"
            id="dot1"
            value="nam"
          />
          <input
            type="radio"
            name="sex"
            id="dot2"
            value="nữ"
          />
          <span className="title"> Giới tính</span>
          <div className="option">
            <label htmlFor="dot1">
              <span className="dot one"></span>
              <span className="gender"> Nam</span>
            </label>

            <label htmlFor="dot2">
              <span className="dot two"></span>
              <span className="gender"> Nữ</span>
            </label>
          </div>
        </div>

        <div className="button">
          <input type="submit" value="Nhập" />
          <input type="button" value="Hủy" />
        </div>
      </form>
    </div>
  );
};

export default PopulationDeclaration;
