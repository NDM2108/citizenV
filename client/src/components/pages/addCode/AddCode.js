import "./AddCode.css";
import { Navigate, useNavigate } from "react-router-dom";

const AddCode = () => {
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
    <div className="container-add-account-form">
      <div className="title"> Cấp mã</div>
      <form form className="newUserForm" onSubmit={handleSubmit}>
        <div className="info">
          <div className="inputBox">
            <span className="details"> Mã</span>
            <input
              className="text_field"
              name="id"
              type="text"
              placeholder=""
              required
            />
          </div>

          <div className="inputBox">
            <span className="details">Tỉnh, thành phố </span>
            <input
              className="text_field"
              name="address"
              type="text"
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

export default AddCode;