// import { useContext, useState, useRef } from "react";
import "./popuDeclaration.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react"


const PopulationDeclaration = () => {
  const navigate = useNavigate();

  const [citizen, setInput] = useState({
    id: '',
    gender: '',
    hometown: '',
    regilion: '',
    job: '',
    card: '',
    dob: '',
    educationallevel: '',
    fullname: '',
    permanentaddress: '',
    temporaryaddress: '',
  });

  const handleChange = e => {
    setInput({...citizen, [e.target.name]: e.target.value })
    console.log(citizen)
  };

  const handleSubmit = e => {
    async function createData(citizen) {
      const dataResult = await fetch('http://localhost:5000/population_declaration', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(citizen),
      });
      return dataResult
    }

    createData(citizen)
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.error(err);
      });
      
    navigate('/population')
  }
  return (
    <div className="container-declaration">
      <div className="title"> Nhập liệu về dân số</div>
      <form className="form-declaration" method="post" action="http://localhost:5000/population_declaration" onSubmit={handleSubmit}>
        <div className="info">
          <div className="inputBox">
            <span className="details"> Họ và tên</span>
            <input
              name="fullname"
              type="text"
              required
              onChange={handleChange}
            />
          </div>

          <div className="inputBox">
            <span className="details"> Ngày sinh</span>
            <input
              name="dob"
              type="date"
              required
              onChange={handleChange}
            />
          </div>

          <div className="inputBox">
            <span className="details"> Số CCCD/CMND</span>
            <input
              name="card"
              type="text"
              required
              onChange={handleChange}
            />
          </div>

          <div className="inputBox">
            <span className="details"> Quê quán</span>
            <input
              name="hometown"
              type="text"
              required
              onChange={handleChange}
            />
          </div>

          <div className="inputBox">
            <span className="details"> Địa chỉ thường trú</span>
            <input
              name="permanentaddress"
              type="text"
              required
              onChange={handleChange}
            />
          </div>

          <div className="inputBox">
            <span className="details"> Địa chỉ tạm trú</span>
            <input
              name="temporaryaddress"
              type="text"
              required
              onChange={handleChange}
            />
          </div>

          <div className="inputBox">
            <span className="details">Trình độ học vấn</span>
            <input
              name="educationallevel"
              type="text"
              required
              onChange={handleChange}
            />
          </div>

          <div className="inputBox">
            <span className="details">Nghề nghiệp</span>
            <input
              name="job"
              type="text"
              required
              onChange={handleChange}
            />
          </div>

          <div className="inputBox">
            <span className="details">Tôn giáo</span>
            <input
              name="religion"
              type="text"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="gender-info">
          <input
            type="radio"
            name="gender"
            id="dot1"
            value="nam"
            onChange={handleChange}
          />
          <input
            type="radio"
            name="gender"
            id="dot2"
            value="nữ"
            onChange={handleChange}
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
