/* eslint-disable */
import { useState, useContext, useEffect, useRef } from "react";
import "./EditAccount.css";
import { CalendarToday, PermIdentity, Publish } from "@material-ui/icons";
import { Link } from "react-router-dom";
// import { AccContext } from "../../../contexts/accContext";
// import AlertDialog from "../accountList/AlertDialog";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
// import { locations } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import GppGoodIcon from "@mui/icons-material/GppGood";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
// import ChangePassword from "./ChangeSubPassword/ChangeSubPassword";
// import ChangeSubStatus from "./ChangeSubStatus/ChangeSubStatus";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SchoolIcon from "@mui/icons-material/School";
import DomainIcon from "@mui/icons-material/Domain";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";

const EditAccount = ({ accountID }) => {
    const [subAccount, setSubAccount] = useState({
        id: "",
        name: "",
        progress: "",
        state: "",
        role: "",
        address: "",
    });

    const levels = ["A1", "A2", "A3", "B1", "B2"];

    // Get infor account
    const GetSubAccount = async () => {
        try {
            const DataSubAccount = await getSubAccount(accountID);
            if (DataSubAccount.success) {
                const { name, id, progress, role, state, address } =
                    DataSubAccount.subAccount;
                const addr = address && address.split("-");

                setSubAccount({
                    ...subAccount,
                    name,
                    id,
                    progress,
                    role,
                    state,
                    address,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    // useEffect(() => {
    //     GetSubAccount();
    // }, []);

    // state for dialog
    const [open, setOpen] = useState(false);

    // func delete account
    const navigate = useNavigate();

    const handleClickDelBtn = () => {
        setOpen(true);
        console.log(accState);
    };

    const deleteAccount = async () => {
        try {
            const reponse = await deleteSubAccount();
            if (reponse.success) {
                navigate("/accounts");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Change Password
    const [formChangePass, setFormChangePass] = useState(false);
    const [formChangeStatus, setFormChangeStatus] = useState(false);

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
                            <span className="accountShowUserTitle"> {subAccount.name}</span>
                        </div>
                    </div>
                    <div className="accountShowBottom">
                        <span className="accountShowTitle">Account Details</span>

                        <div className="accountShowInfo">
                            <span className="accountShowInfoTitle">
                                <PermIdentity className="accountShowIcon" />
                                <span> Account ID:</span>
                            </span>
                            <span>{subAccount.id}</span>
                        </div>

                        <div className="accountShowInfo">
                            <span className="accountShowInfoTitle">
                                <DomainIcon className="accountShowIcon" />
                                <span>Tỉnh/Thành phố :</span>
                            </span>
                            <span>{subAccount.address}</span>
                        </div>

                        <div className="accountShowInfo">
                            <span className="accountShowInfoTitle">
                                <DomainIcon className="accountShowIcon" />
                                <span>Thuộc :</span>
                            </span>
                            <span>{subAccount.address}</span>
                        </div>

                        <div className="accountShowInfo">
                            <span className="accountShowInfoTitle">
                                <SchoolIcon className="accountShowIcon" />
                                <span style={{ display: 'inline', }}>Cấp bậc tài khoản :</span>
                            </span>
                            <span> {levels[subAccount.role]}</span>
                        </div>

                        <div className="accountShowInfo">
                            <span className="accountShowInfoTitle">
                                <CalendarToday className="accountShowIcon" />
                                <span >Quyền khai báo:</span>
                            </span>
                            <span>{subAccount.state ? "Active" : "Disabled"}</span>
                        </div>
                    </div>
                </div>

                {/* ----------------------------------------------------------------- */}
                <div className="accountUpdate">
                    <span className="accountUpdateTitle">Edit</span>
                    <form className="accountUpdateForm">
                        <div className="accountUpdateLeft">
                            <div>
                                <div className="accountShowInfo">
                                    <span className="accountShowInfoTitle">
                                        <EventAvailableIcon className="accountShowIcon" />
                                        <span>Thời gian bắt đầu khai báo:</span>
                                    </span>
                                    <span>{"NaN"}</span>
                                </div>
                                <div className="accountShowInfo">
                                    <span className="accountShowInfoTitle">
                                        <EventBusyIcon className="accountShowIcon" />
                                        <span>Thời gian kết thúc khai báo:</span>
                                    </span>
                                    <span>{"NaN"}</span>
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
                                <img
                                    className="accountUpdateImg"
                                    src="https://www.gso.gov.vn/wp-content/uploads/2021/01/gso_logo.png"
                                    alt=""
                                />
                            </div>
                            <button className="accountUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditAccount;