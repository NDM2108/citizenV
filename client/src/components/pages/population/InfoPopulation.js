import { useEffect, useState } from "react"
import axios from 'axios';
import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../dashboard/Footer";


function TestInfo() {

    const { personID } = useParams();
    console.log(personID);
    const [listUsers, setListUsers] = useState([])

    useEffect(() => {
        // axios.get('http://localhost:5000/citizen_infos')
        //     .then(response => {
        //         const list = response.data
        //         setListUsers(list)
        //         console.log(list);

        //     })
        fetch('http://localhost:5000/citizen_infos', {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authentication": "Bearer " + localStorage.getItem('accessToken')
            }
        })
            .then(response => response.json())
            .then(data => {
                setListUsers(data)
            })
    }, [])

    // useEffect(async () => {
    //     async function axiosAPI() {
    //         let response = await axios.get('http://localhost:5000/citizen_infos')
    //             .then(response => {
    //                 const listUsers = response.data
    //                 setListUsers(listUsers)
    //             })
    //     }
    //     axiosAPI();
    // }, [])

    // console.log(listUsers);

    var persons = listUsers;
    var person = {}

    for (var i = 0; i < persons.length; i++) {
        if (listUsers[i] !== undefined) {
            if (listUsers[i].id == personID) {
                // setTimeout(person = listUsers[i], 1)
                person = listUsers[i]
            }
        }
    }
    const item = person;

    console.log(item.dob);

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <h1 className="h1">Thông tin cá nhân</h1>
            <table className="table table-striped">
                <tbody key={item.id}>
                    <tr >
                        <th>Họ tên</th>
                        <td>{item.fullname}</td>
                    </tr>
                    <tr >
                        <th>Ngày sinh</th>
                        <td>{item.dob}</td>
                    </tr>
                    <tr >
                        <th>CCCD</th>
                        <td>{item.id}</td>
                    </tr>
                    <tr >
                        <th>Giới tính</th>
                        <td>{item.gender}</td>
                    </tr>
                    <tr >
                        <th>Quê quán</th>
                        <td>{item.village} - {item.district} - {item.province}</td>
                    </tr>
                    <tr >
                        <th>Địa chỉ thường trú</th>
                        <td>{item.permanentaddress}</td>
                    </tr>
                    <tr >
                        <th>Địa chỉ tạm trú</th>
                        <td>{item.temporaryaddress}</td>
                    </tr>
                    <tr >
                        <th>Trình độ học vấn</th>
                        <td>{item.educationallevel}</td>
                    </tr>
                    <tr >
                        <th>Nghề nghiệp</th>
                        <td>{item.job}</td>
                    </tr>
                    <tr >
                        <th>Tôn giáo</th>
                        <td>{item.religion}</td>
                    </tr>

                </tbody>
            </table>
            
        </div>



    )

}

export default TestInfo;