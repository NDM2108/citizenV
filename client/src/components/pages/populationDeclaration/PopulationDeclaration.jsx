// import { useContext, useState, useRef } from "react";
import "./popuDeclaration.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react"
import { useEffect } from "react"
import Select from 'react-select'
import axios from 'axios';

function PopulationDeclaration() {
  const navigate = useNavigate();

  const [provinceOptions, setProvince] = useState([]);
  const [districtOptions, setDistrict] = useState([]);
  const [villageOptions, setVillage] = useState([]);

  const [citizen, setInput] = useState({
    id: '',
    gender: '',
    province: '',
    district: '',
    village: '',
    regilion: '',
    job: '',
    dob: '',
    educationallevel: '',
    fullname: '',
    permanentaddress: '',
    temporaryaddress: '',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/all_provinces')
        .then(response => {
            let json = response.data
            let ops = []
            for (let i = 0; i < json.length; i++) {
              ops.push({value: json[i].province, label: json[i].province})
            }
            setProvince(ops)
            console.log(ops);
        })
  }, [])

  const getDistricts = selected => {
    setInput({...citizen, province: selected.value })
    fetch('http://localhost:5000/get_districts',{
      method: "POST",
      body: JSON.stringify({province: selected.value}),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(data => {
      let ops = []
      for (let i = 0; i < data.length; i++) {
        ops.push({value: data[i].district, label: data[i].district})
      }
      setDistrict(ops)
      console.log(ops)
    })
  }

  const getVillages = selected => {
    setInput({...citizen, district: selected.value })
    fetch('http://localhost:5000/get_villages',{
      method: "POST",
      body: JSON.stringify({district: selected.value}),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(data => {
      let ops = []
      for (let i = 0; i < data.length; i++) {
        ops.push({value: data[i].village, label: data[i].village})
      }
      setVillage(ops)
      console.log(ops)
    })
  }

  const selectVillage = selected => {
    setInput({...citizen, village: selected.value })
  }

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
      navigate('/population')
      })
      .catch((err) => {
        console.error(err);
      });
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
              name="id"
              type="text"
              required
              onChange={handleChange}
            />
          </div>

          <div className="inputBox">
            <span className="details"> Quê quán</span>
            <Select 
            placeholder="Tỉnh" 
            options={provinceOptions}
            onChange={getDistricts}/>
            <Select 
            placeholder="Quận" 
            options={districtOptions} 
            onChange={getVillages}/>
            <Select 
            placeholder="Xã" 
            options={villageOptions} 
            onChange={selectVillage}/>
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
            value="Nam"
            onChange={handleChange}
          />
          <input
            type="radio"
            name="gender"
            id="dot2"
            value="Nữ"
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
