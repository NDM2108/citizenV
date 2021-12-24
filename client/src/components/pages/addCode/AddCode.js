import "./AddCode.css";
import { Navigate, useNavigate } from "react-router-dom";

const AddCode = () => {
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    const code = { id: data.get('id'), name: data.get('name') }
    console.log(code);
    fetch('http://localhost:5000/add_code', {
      method: "POST",
      body: JSON.stringify(code),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authentication": "Bearer " + localStorage.getItem('accessToken')
      }
    })
    .then(response => response.text())
    .then(data => {
      if (data == 'success') {
        navigate('/admin')
      }
    });
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
              name="name"
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