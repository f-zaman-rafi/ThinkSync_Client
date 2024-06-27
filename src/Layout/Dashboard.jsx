import { Outlet } from "react-router-dom";
import DashNav from "../Pages/Dashboard/DashNav/DashNav";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
    return (
        <div className="lg:max-w-7xl mx-auto">
            <Helmet>
                <title>Dashboard | ThinkSync</title>
            </Helmet>
            <ScrollToTop />
            <DashNav></DashNav>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;

