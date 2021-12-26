import React, { Component } from "react";
import Login from "./components/pages/login/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/pages/home/Home";
import DashboardContent from "../src/components/pages/dashboard/Dashboard"
import 'bootstrap/dist/css/bootstrap.min.css';
import PopulationDeclaration from "./components/pages/populationDeclaration/PopulationDeclaration";
import { Navigate } from 'react-router-dom';
import Test from "./Test";
// import EditAccount from "./components/pages/accountManager/editAccount/EditAccount";
// import UpdateStatus from "./components/pages/accountManager/editAccount/updateStatus/UpdateStatus"


class App extends Component {

    render() {
        return (
            <>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={checkLogin()} />
                    <Route path="*" element= {<DashboardContent />} />
                    {/* <Route path="/test" element={<UpdateStatus />} /> */}
                </Routes>
            </>
        )
    }
}

function checkLogin() {
    return localStorage.getItem('accessToken') ? <Navigate to="/admin" /> : <Login />
}

export default App;