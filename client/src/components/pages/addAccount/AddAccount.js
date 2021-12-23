import "./AddAccount.css";
import { Navigate, useNavigate } from "react-router-dom";

const AddAccount = () => {
  const navigate = useNavigate();

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
    <div className="new-account" >
      <h1 className="h3">Tạo Tài Khoản Mới</h1>

      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label>Tài Khoản - ID</label>
          <input
            name="id"
            type="text"
            placeholder=""
            required
          />
        </div>

        <div className="newUserItem">
          <label>Tỉnh/Thành Phố</label>
          <input
            name="address"
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