import "./AddAccount.css";
import { Navigate, useNavigate } from "react-router-dom";

const AddAccount = () => {
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    if (data.get('pass') == data.get('rePass')) {
      const account = { locationid: data.get('location_id'), location: data.get('location'), password: data.get('pass') }
      console.log(account);
      fetch('http://localhost:5000/add_account', {
        method: "POST",
        body: JSON.stringify(account),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
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
    <div className="new-account">
      <h1 className="newUserTitle">Tạo Tài Khoản Mới</h1>

      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label>Tài Khoản - ID</label>
          <input
            name="location_id"
            type="text"
            placeholder=""
            required
          />
        </div>

        <div className="newUserItem">
          <label>Tỉnh/Thành Phố</label>
          <input
            name="location"
            type="text"
            placeholder=""
            required
          />
        </div>

        <div className="newUserItem">
          <label>Mật Khẩu</label>
          <input
            name="pass"
            type="password"
            placeholder=""
            required
          />
        </div>

        <div className="newUserItem">
          <label>Nhập Lại Mật Khẩu</label>
          <input
            name="rePass"
            type="password"
            placeholder=""
            required
          />
        </div>

        <button className="newUserButton" type="submit">
          Xác Nhận
        </button>
      </form>
    </div>
  );
};

export default AddAccount;