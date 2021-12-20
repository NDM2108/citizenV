// import Login from "./routes/Login";
// import { Routes, Route } from "react-router-dom";
// import Home from "./routes/Home";
// import DashboardContent from "../src/components/dashboard/Dashboard"


// function App() {  
     
//     return (
//         <>
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/congdan/:id" element={<p>test</p>} />
//                 <Route path="/quanly" element={<p>test</p>} />
//                 <Route path="/tiendo" element={<p>test</p>} />
//                 <Route path="/nhaplieu" element={<p>test</p>} />
//                 <Route path="/admin" element={<DashboardContent />} />

//             </Routes>
//         </>
//     );
// }

// export default App;

import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Login from "./routes/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import DashboardContent from "../src/components/dashboard/Dashboard"

class Test extends Component {
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
                    <Route path="/congdan/:id" element={<p>test</p>} />
                    <Route path="/quanly" element={<p>test</p>} />
                    <Route path="/tiendo" element={<p>test</p>} />
                    <Route path="/nhaplieu" element={<p>test</p>} />
                    <Route path="/admin" element={<DashboardContent />} />

                </Routes>
            </>
        )
    }
}
export default Test;
