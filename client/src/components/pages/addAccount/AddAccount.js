import "./AddAccount.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react"
import { useEffect } from "react"
import Select from 'react-select'

const AddAccount = () => {
  const navigate = useNavigate();
  const [inferiors, setInferiors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/get_inferiors', {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authentication": "Bearer " + localStorage.getItem('accessToken')
      }
    })
      .then(response => response.json())
      .then(data => {
        let ops = []
        for (let i = 0; i < data.length; i++) {
          ops.push({value: data[i].district, label: data[i].district})
        }
      setInferiors(ops)
      });
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    if (data.get('pass') == data.get('rePass')) {
      const account = { id: data.get('id'), address: data.get('address'), password: data.get('pass') }
      console.log(account);
      fetch('http://localhost:5000/add_account', {
        method: "POST",
        body: JSON.stringify(account),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authentication": "Bearer " + localStorage.getItem('accessToken')
        }
      })
        .then(response => response.text())
        .then(data => {
          if (data == 'success') {
            navigate('/accMan')
          }
        });
    } else {
      alert('Mật khẩu không trùng nhau')
    }
  }

  return (
    <div className="container-add-account-form">
      <div className="title"> Thêm tài khoản</div>
      <form form className="newUserForm" onSubmit={handleSubmit}>
        <div className="info">
          <div className="inputBox">
            <span className="details">Tỉnh, thành phố </span>
            <Select
              placeholder="Tỉnh / Thành phố"
              options={inferiors} />
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
            <button className="newUserButton" type="submit">
              Xác Nhận
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddAccount;