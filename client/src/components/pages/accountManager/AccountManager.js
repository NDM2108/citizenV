import React from "react";
import "./AccountManager.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function AccountManager() {

    const [account, setAccount] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/accounts')
            .then(response => {
                const account = response.data
                setAccount(account)
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
                        <Link to={"/accounts/1"}>
                            <button
                                className="btnEdit"
                            >
                                Edit
                            </button>
                        </Link>
                    </>
                );
            },
        },
    ];



    const [styleTable, setStyleTable] = useState({
        marginTop: "100px",
        width: "650px",
        display: "flex",
    });


    return (
        <div className="AccountManager">
            <div className="wrap-container">
                <div className="top-container">
                    <Link to="/addaccount">
                        <button className="btnCreateAccount">Thêm Tài Khoản</button>
                    </Link>
                </div>
                <div id="datatable" style={styleTable}>
                    <DataGrid
                        rows={account}
                        columns={columns}
                        eslint-disable-next-line
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        autoHeight
                        density="comfortable"
                    />
                </div>
            </div>
        </div>
    );
}

export default AccountManager;