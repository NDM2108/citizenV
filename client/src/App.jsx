import Login from "./routes/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import DashboardContent from "../src/components/dashboard/Dashboard"
import {BrowserRouter as Routes, Route, Switch} from 'react-router-dom'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dangnhap" element={<Login />} />
                <Route path="/congdan/:id" element={<p>test</p>} />
                <Route path="/quanly" element={<p>test</p>} />
                <Route path="/tiendo" element={<p>test</p>} />
                <Route path="/nhaplieu" element={<p>test</p>} />
                <Route path="/admin" element={<DashboardContent />} />

            </Routes>
        </>
    );
}

export default App;
