import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <div>
                <h1>
                    hit thehe
                    <Link to='all-users'><p className="btn btn-warning">All users</p></Link>
                </h1>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;