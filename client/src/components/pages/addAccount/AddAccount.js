import "./AddAccount.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";

const AddAccount = () => {
  const navigate = useNavigate();
  const [inferiors, setInferiors] = useState([]);
  var selectedAddress;
  var selectedId;
  var ops = [];
  var disabled = false;

  useEffect(() => {
    fetch("http://localhost:5000/get_inferiors", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authentication: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (localStorage.getItem("level") == "A1") {
          for (let i = 0; i < data.length; i++) {
            ops.push({
              value: data[i].province,
              label: data[i].province,
              id: data[i].id,
            });
          }
          console.log(ops);
        } else if (localStorage.getItem("level") == "A2") {
          for (let i = 0; i < data.length; i++) {
            ops.push({
              value: data[i].district,
              label: data[i].district,
              id: data[i].id,
            });
          }
        } else if (localStorage.getItem("level") == "A3") {
          for (let i = 0; i < data.length; i++) {
            ops.push({
              value: data[i].village,
              label: data[i].village,
              id: data[i].id,
            });
          }
        } else if (localStorage.getItem("level") == "B1") {
          for (let i = 0; i < data.length; i++) {
            ops.push({
              value: data[i].clan,
              label: data[i].clan,
              id: data[i].id,
            });
          }
        }
        setInferiors(ops);
      });
  }, []);

  const handleSelect = (selected) => {
    selectedAddress = selected.value;
    selectedId = selected.id;
    console.log(selectedId);
    fetch("http://localhost:5000/check_account_exist", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ id: selectedId }),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "exist") {
          alert("Tài khoản đã tồn tại");
          disabled = true;
        } else {
          disabled = false;
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled == false) {
      const data = new FormData(e.currentTarget);
      if (data.get("pass") == data.get("rePass")) {
        const account = {
          address: selectedAddress,
          password: data.get("pass"),
          id: selectedId,
        };
        console.log(account);
        fetch("http://localhost:5000/add_account", {
          method: "POST",
          body: JSON.stringify(account),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authentication: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
          .then((response) => response.text())
          .then((data) => {
            if (data == "success") {
              navigate("/accMan");
            }
          });
      } else {
        alert("Mật khẩu không trùng nhau");
      }
    }
  };

  return (
    <div className="container-add-account-form">
      <div className="title"> Thêm tài khoản</div>
      <form form className="newUserForm" onSubmit={handleSubmit}>
        <div className="info">
          <div className="inputBox">
            <span className="details">Tên tài khoản </span>
            <Select
              placeholder="Tên tài khoản"
              options={inferiors}
              onChange={handleSelect}
            />
          </div>

          <div className="inputBox">
            <span className="details">Mật khẩu</span>
            <input
              className="text_field"
              name="pass"
              type="password"
              placeholder=""
              required
            />
          </div>

          <div className="inputBox">
            <span className="details">Xác nhận mật khẩu</span>
            <input
              className="text_field"
              name="rePass"
              type="password"
              placeholder=""
              required
            />
          </div>
          <div className="button-container">
            <button className="newUserButton" type="submit" disabled={disabled}>
              Xác Nhận
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAccount;
