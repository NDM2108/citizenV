import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

class Test extends React.Component {
  state = {
    listUsers: [],
  };

  async componentDidMount() {
    let res = await axios.get("http://localhost:5000/citizen_infos");
    var user = [res.data[0]];
    this.setState({
      listUsers: res ? user : [],
    });
    console.log(res.data);
  }

  render() {
    let { listUsers } = this.state;

    let tb_data = this.state.listUsers.map((item) => {
      return (
        <tbody key={item.id}>
          <tr>
            <th>Họ tên</th>
            <td>{item.fullname}</td>
          </tr>
          <tr>
            <th>Ngày sinh</th>
            <td>{item.dob}</td>
          </tr>
          <tr>
            <th>CCCD</th>
            <td>{item.card}</td>
          </tr>
          <tr>
            <th>Giới tính</th>
            <td>{item.gender}</td>
          </tr>
          <tr>
            <th>Quê quán</th>
            <td>{item.hometown}</td>
          </tr>
          <tr>
            <th>Địa chỉ thường trú</th>
            <td>{item.permanentaddress}</td>
          </tr>
          <tr>
            <th>Địa chỉ tạm trú</th>
            <td>{item.temporaryaddress}</td>
          </tr>
          <tr>
            <th>Trình độ học vấn</th>
            <td>{item.educationallevel}</td>
          </tr>
          <tr>
            <th>Nghề nghiệp</th>
            <td>{item.job}</td>
          </tr>
          <tr>
            <th>Tôn giáo</th>
            <td>{item.religion}</td>
          </tr>
          <tr>
            <th>ID Vùng</th>
            <td>{item.id}</td>
          </tr>
        </tbody>
      );
    });

    return (
      <div className="container">
        <table className="table table-striped">{tb_data}</table>
      </div>
    );
  }
}

export default Test;
