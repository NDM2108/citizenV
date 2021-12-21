import React, { Component } from "react";
import Login from "./components/pages/login/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/pages/home/Home";
import DashboardContent from "../src/components/pages/dashboard/Dashboard"
import 'bootstrap/dist/css/bootstrap.min.css';




class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:5000/login")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res.text() }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }
    render() {
        return (
            <>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<DashboardContent />} />
                </Routes>
            </> 
        )
    }
}
export default App;