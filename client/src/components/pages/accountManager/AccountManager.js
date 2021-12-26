import React from "react";
import "./AccountManager.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { height } from "@mui/system";

function AccountManager() {

    const [account, setAccount] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/accounts', {
            method: "POST",
            body: JSON.stringify({ 'id': localStorage.getItem('id') }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authentication": "Bearer " + localStorage.getItem('accessToken')
            }
        })
            .then(response => {
                if (response.status == 200) {
                    return response.json()
                }
            })
            .then(data => {
                console.log(data)
                setAccount(data)
            })
    }, [])
    console.log(account);



    const levelAccount = localStorage.getItem('level')
    console.log(levelAccount);

    var role = 0;

    if (levelAccount == 'A1') {
        role = 0;
    } else if (levelAccount == 'A2') {
        role = 1;
    } else if (levelAccount == 'A3') {
        role = 2;
    } else if (levelAccount == 'B1') {
        role = 3;
    }


    const navigate = useNavigate();
    const columns = [
        { field: "id", headerName: "Account ID", width: 100 },
        { field: "address", headerName: "Tỉnh/Thành phố", width: 200 },
        { field: "address", headerName: "Quận/Huyện", width: 200 },
        { field: "address", headerName: "Xã/Phường", width: 200 },
        { field: "address", headerName: "Thôn/Xóm", width: 200 },
        { field: "status", headerName: "Trạng Thái", width: 150 },
        {
            field: "action",
            headerName: " ",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/accMan/" + params.row.id}>
                            <button
                                className="btnEdit"
                            >
                                Chỉnh sửa
                            </button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const cols = [
        columns[0],
        columns[role + 1],
        columns[5],
        columns[6],

    ];

    const [styleTable, setStyleTable] = useState({
        marginTop: "10px",
        width: "650px",
        display: "flex",
    });


    return (
        <MDBTable responsive>
            <div >
                <div className="top-container">
                    <Link to="/addaccount">
                        <button className="btnCreateAccount">Thêm Tài Khoản</button>
                    </Link>
                </div>
                <div id="datatable" style={styleTable}>
                    <DataGrid
                        rows={account}
                        columns={cols}
                        // eslint-disable-next-line
                        columnSorter
                        columnFilter
                        pagination
                        rowsPerPageOptions={[10]}
                        pageSize={6}
                        disableSelectionOnClick
                        autoHeight
                        tableProps={{
                            hover: true,
                        }}
                    />
                </div>
            </div>
            
        </MDBTable>
    );
}

export default AccountManager;
