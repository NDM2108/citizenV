import "./AddAccount.css";

const AddAccount = () => {
  
  return (
    <div className="new-account">
      <h1 className="newUserTitle">Tạo Tài Khoản Mới</h1>

      <form className="newUserForm" >
        <div className="newUserItem">
          <label>Tài Khoản - ID</label>
          <input
            name="sub_id"
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