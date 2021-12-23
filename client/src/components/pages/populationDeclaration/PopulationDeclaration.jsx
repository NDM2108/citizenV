// import { useContext, useState, useRef } from "react";
import "./popuDeclaration.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react"
import Select from 'react-select'

const PopulationDeclaration = () => {
  const navigate = useNavigate();
  var provinceOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  var districtOptions
  var villageOptions

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

  const loadProvinces = () => {
    fetch('http://localhost:5000/provinces')
    .then(response => {
      return response.json()
    }).then(data => {
      console.log(data)
    })
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
            <Select 
            placeholder="Tỉnh"
            options={provinceOptions} />
            <Select 
            placeholder="Quận"
            options={districtOptions} />
            <Select 
            placeholder="Xã"
            options={villageOptions} />
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
