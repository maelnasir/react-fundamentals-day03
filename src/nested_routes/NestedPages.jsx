import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Overview from "./pages/Overview";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

export default function NestedPages(){

    return(
        <Router>
            <nav style={{ display: "flex", gap: 10 }}>
                <NavLink to="">Home</NavLink>
                <NavLink to="dashboard">Dashboard</NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="overview" element={<Overview />} />{/* Default nested route */}
                    <Route path="reports" element={<Reports />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </Router>
    )
}