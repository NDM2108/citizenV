import React, { useState, useEffect, useContext } from 'react';
import './UpdateStatus.css';
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function UpdateStatus({ subId, setOpen, params }) {
    const [valueStatus, setValueStatus] = useState(false);
    const [date, setDate] = useState();
    const [start, setStart] = useState();
    const [isError, setIsError] = useState(false);

    const { accountID } = useParams();
    console.log(accountID);


    const navigate = useNavigate();

    const [update, setUpdate] = useState({
        status: '',
        timeopen: '',
        timeclosed: '',
    });

    const handleSubmit = e => {
        e.preventDefault()
        async function updateData(update) {
            const dataResult = await fetch('http://localhost:5000/update_account', {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authentication": "Bearer " + localStorage.getItem('accessToken')
                },
                body: JSON.stringify(update),
            });
            return dataResult
        }

        updateData(update)
            .then(response => response.text())
            .then(data => {
                if (data == 'success') {
                    navigate('/accMan')
                }
            })
    }


    return (
        <div className="status-container">
            <Link to={"/accMan/"}>
                <CloseIcon className="status-close" />
            </Link>
            <form onSubmit={handleSubmit}>
                <div className="status-info">
                    <input
                        type="radio"
                        name="status"
                        id="dot1"
                        value={false}
                        onChange={(e) => setValueStatus(false)}
                        checked={!valueStatus}
                    />
                    <input
                        type="radio"
                        name="status"
                        id="dot2"
                        value={true}
                        onChange={(e) => setValueStatus(true)}
                    />
                    <span className="title">Khai báo dân số</span>
                    <div className="option">
                        <label htmlFor="dot1">
                            <span className="dot one"></span>
                            <span className="gender">Tắt</span>
                        </label>

                        <label htmlFor="dot2">
                            <span className="dot two"></span>
                            <span className="gender">Mở</span>
                        </label>
                    </div>
                </div>

                <div className="status-event">
                    <p>Ngày bắt đầu</p>
                    <input
                        name='timeopen'
                        type="date"
                        className="status-date"
                        onChange={(e) => setStart(e.target.valueAsDate)}
                        onFocus={() => setIsError(false)}
                        disabled={!valueStatus}
                    />
                    <p>Ngày kết thúc</p>
                    <input
                        name='timeclosed'
                        type="date"
                        className="status-date"
                        onChange={(e) => setDate(e.target.valueAsDate)}
                        onFocus={() => setIsError(false)}
                        disabled={!valueStatus}
                    />

                    <Button type="submit" variant="outlined" className="status-button">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default UpdateStatus
