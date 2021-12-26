import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import "./EditAccount.css";
import { CalendarToday, PermIdentity, Publish } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SchoolIcon from "@mui/icons-material/School";
import DomainIcon from "@mui/icons-material/Domain";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";

const EditAccount = () => {

    const [subAccount, setSubAccount] = useState({
        id: "",
        name: "",
        progress: "",
        state: "",
        role: "",
        address: "",
    });

    const { accountID } = useParams();
    console.log(accountID);


    const [accounts, setAccounts] = useState([])

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
                setAccounts(data)
            })
    }, [])
    console.log(accounts);


    var account = {}

    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i] !== undefined) {
            if (accounts[i].id == accountID) {
                // setTimeout(person = listUsers[i], 1)
                account = accounts[i];
            }
        }
    }
    console.log(account);

    const levelAccount = localStorage.getItem('level')
    console.log(levelAccount);

    var role = '';

    if (levelAccount == 'A1') {
        role = 'Tỉnh/Thành phố';
    } else if (levelAccount == 'A2') {
        role = 'Quận/Huyện';
    } else if (levelAccount == 'A3') {
        role = 'Xã/Phường';
    } else if (levelAccount == 'B1') {
        role = 'Thôn/Xóm';
    }

    // state for dialog
    const [open, setOpen] = useState(false);

    // func delete account
    const navigate = useNavigate();

    return (
        <div className="account">
            <div className="accountContainer">
                <div className="accountShow">
                    <div className="accountShowTop">
                        <img
                            src="https://www.gso.gov.vn/wp-content/uploads/2021/01/gso_logo.png"
                            alt=""
                            className="accountShowImg"
                        />
                        <div className="accountShowTopTitle">
                            <span className="accountShowUsername">
                                Tài Khoản Điều Tra Dân Số
                            </span>
                            <span className="accountShowUserTitle">{account.address} </span>
                        </div>
                    </div>
                    <div className="accountShowBottom">
                        <span className="accountShowTitle">Thông tin tài khoản</span>

                        <div className="accountShowInfo">
                            <span className="accountShowInfoTitle">
                                <PermIdentity className="accountShowIcon" />
                                <span> Account ID:</span>
                            </span>
                            <span>{account.id}</span>
                        </div>

                        <div className="accountShowInfo">
                            <span className="accountShowInfoTitle">
                                <DomainIcon className="accountShowIcon" />
                                <span>{role}:</span>
                            </span>
                            <span>{account.address}</span>
                        </div>

                        <div className="accountShowInfo">
                            <span className="accountShowInfoTitle">
                                <DomainIcon className="accountShowIcon" />
                                <span>Thuộc:</span>
                            </span>
                            <span>{account.superiorAddress}</span>
                        </div>

                        <div className="accountShowInfo">
                            <span className="accountShowInfoTitle">
                                <SchoolIcon className="accountShowIcon" />
                                <span style={{ display: 'inline', }}>Cấp bậc tài khoản :</span>
                            </span>
                            <span> {account.level}</span>
                        </div>

                        <div className="accountShowInfo">
                            <span className="accountShowInfoTitle">
                                <CalendarToday className="accountShowIcon" />
                                <span >Quyền khai báo:</span>
                            </span>
                            <span>{account.status}</span>
                        </div>
                    </div>
                </div>

                {/* ----------------------------------------------------------------- */}
                <div className="accountUpdate">
                    <span className="accountUpdateTitle">Chỉnh sửa</span>
                    <form className="accountUpdateForm">
                        <div className="accountUpdateLeft">
                            <div>
                                <div className="accountShowInfo">
                                    <span className="accountShowInfoTitle">
                                        <EventAvailableIcon className="accountShowIcon" />
                                        <span className="time">Thời gian bắt đầu khai báo:</span>
                                    </span>
                                    <span>{account.timeopen}</span>
                                </div>
                                <div className="accountShowInfo">
                                    <span className="accountShowInfoTitle">
                                        <EventBusyIcon className="accountShowIcon" />
                                        <span className="time">Thời gian kết thúc khai báo:</span>
                                    </span>
                                    <span>{account.timeclose}</span>
                                </div>
                            </div>
                            <div className="accountShowInfo">
                                <span className="accountShowInfoTitle">
                                    <DonutLargeIcon className="accountShowIcon" />
                                    <span>Tiến độ khai báo:</span>
                                </span>
                                <span>{subAccount.progress ? "Hoàn thành" : "Chưa hoàn thành"}</span>
                            </div>
                        </div>

                        <div className="accountUpdateRight">
                            <div className="accountUpdateUpload">
                                {/* <img
                                    className="accountUpdateImg"
                                    src="https://www.gso.gov.vn/wp-content/uploads/2021/01/gso_logo.png"
                                    alt=""
                                /> */}

                            </div>
                            <Link to={"/accMan/update/" + accountID}>
                                <button className="accountUpdateButton">Update</button>
                            </Link>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditAccount;
