import { Outlet } from "react-router-dom";
import DashNav from "../Pages/Dashboard/DashNav/DashNav";

const Dashboard = () => {
    return (
        <div className="lg:max-w-7xl mx-auto">
            <DashNav></DashNav>
            <Outlet></Outlet>

        </div>
    );
};

export default Dashboard;

