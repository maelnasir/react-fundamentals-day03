import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <div>
            <h2>📊 Dashboard Layout</h2>
            <nav style={{ display: "flex", gap: 10 }}>
                <NavLink to="overview">Overview</NavLink>
                <NavLink to="reports">Reports</NavLink>
                <NavLink to="settings">Settings</NavLink>
            </nav>
            <hr />
            <Outlet /> {/* Nested route content renders here */}
        </div>
        
    );
}
