// import { useContext, useState, useRef } from "react";
import "./popuDeclaration.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";
import axios from "axios";

function PopulationDeclaration() {
  const navigate = useNavigate();

  const [provinceOptions, setProvince] = useState([]);
  const [districtOptions, setDistrict] = useState([]);
  const [villageOptions, setVillage] = useState([]);
  const [clanOptions, setClan] = useState([]);

  const [citizen, setInput] = useState({
    id: "",
    gender: "",
    provinceid: "",
    districtid: "",
    villageid: "",
    clanid: "",
    province: "",
    district: "",
    village: "",
    clan: "",
    regilion: "",
    job: "",
    dob: "",
    educationallevel: "",
    fullname: "",
    permanentaddress: "",
    temporaryaddress: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/all_provinces").then((response) => {
      let json = response.data;
      let ops = [];
      for (let i = 0; i < json.length; i++) {
        ops.push({ value: json[i].id, label: json[i].province });
      }
      setProvince(ops);
      console.log(ops);
    });
  }, []);

  const getDistricts = (selected) => {
    setInput({
      ...citizen,
      province: selected.label,
      provinceid: selected.value,
    });
    console.log(citizen);
    fetch("http://localhost:5000/get_districts", {
      method: "POST",
      body: JSON.stringify({ province: selected.label }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let ops = [];
        for (let i = 0; i < data.length; i++) {
          ops.push({ value: data[i].id, label: data[i].district });
        }
        setDistrict(ops);
        console.log(ops);
      });
  };

  const getVillages = (selected) => {
    setInput({
      ...citizen,
      district: selected.label,
      districtid: selected.value,
    });
    fetch("http://localhost:5000/get_villages", {
      method: "POST",
      body: JSON.stringify({ district: selected.label }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let ops = [];
        for (let i = 0; i < data.length; i++) {
          ops.push({ value: data[i].id, label: data[i].village });
        }
        setVillage(ops);
        console.log(ops);
      });
  };

  const getClans = (selected) => {
    setInput({
      ...citizen,
      village: selected.label,
      villageid: selected.value,
    });
    fetch("http://localhost:5000/get_clans", {
      method: "POST",
      body: JSON.stringify({ village: selected.label }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let ops = [];
        for (let i = 0; i < data.length; i++) {
          ops.push({ value: data[i].id, label: data[i].clan });
        }
        setClan(ops);
        console.log(ops);
      });
  };

  const selectClan = (selected) => {
    setInput({ ...citizen, clan: selected.label, clanid: selected.value });
  };

  const handleChange = (e) => {
    setInput({ ...citizen, [e.target.name]: e.target.value });
    console.log(citizen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    async function createData(citizen) {
      const dataResult = await fetch(
        "http://localhost:5000/population_declaration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(citizen),
        }
      );
      return dataResult;
    }

    createData(citizen)
      .then((response) => response.text())
      .then((data) => {
        if (data == "success") {
          navigate("/population");
        }
      });
  };

  return (
    <div className="container-declaration">
      <div className="title"> Nhập liệu về dân số</div>
      <form
        className="form-declaration"
        method="post"
        action="http://localhost:5000/population_declaration"
        onSubmit={handleSubmit}
      >
        <div className="info">
          <div className="inputBox">
            <span className="details"> Họ và tên</span>
            <input
              name="fullname"
              type="text"
              required
              onChange={handleChange}
              placeholder="*Bắt buộc"
            />
          </div>

          <div className="inputBox">
            <span className="details"> Ngày sinh</span>
            <input name="dob" type="date" required onChange={handleChange} />
          </div>

          <div className="inputBox">
            <span className="details"> Số CCCD/CMND</span>
            <input name="id" type="text" required onChange={handleChange} />
          </div>

          <div className="inputBox">
            <span className="details"> Quê quán</span>
            <Select
              placeholder="Tỉnh / Thành phố"
              options={provinceOptions}
              onChange={getDistricts}
            />
            <Select
              placeholder="Quận / Huyện"
              options={districtOptions}
              onChange={getVillages}
            />
            <Select
              placeholder="Xã / Phường"
              options={villageOptions}
              onChange={getClans}
            />
            <Select
              placeholder="Thôn / Xóm"
              options={clanOptions}
              onChange={selectClan}
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
            <input name="job" type="text" required onChange={handleChange} />
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
}

export default PopulationDeclaration;
