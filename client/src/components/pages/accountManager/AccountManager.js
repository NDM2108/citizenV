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
            body: JSON.stringify({'id': localStorage.getItem('id')}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => {
                if(response.status == 200) {
                    return response.json()
                }
            })
            .then(data => {
                console.log(data)
                setAccount(data)
            })
    }, [])
    console.log(account);

    const navigate = useNavigate();
    const columns = [
        { field: "id", headerName: "Account ID", width: 100 },
        { field: "address", headerName: "Tỉnh/Thành phố", width: 200 },
        // { field: "district", headerName: "Quận/Huyện", width: 250 },
        // { field: "xa", headerName: "Xã/Phường", width: 250 },
        // { field: "xom", headerName: "Thôn/Xóm", width: 250 },
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
                        columns={columns}
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
