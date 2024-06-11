import { Outlet } from "react-router-dom";
import DashNav from "../Pages/Dashboard/DashNav/DashNav";

const Dashboard = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <DashNav></DashNav>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;



// .The tutor dashboard has the following route:
// a.Create study session
// b.View all study sessions created by a tutor
// c.Upload materials
// d.View all materials

// Student dashboard has the following route:
// a.View booked session
// b.Create note
// c.Manage personal notes
// d.View all study materials provided by the tutor\

// 7. Admin dashboard has the following route:
// a.View all users
// b.View all study session
// c.View all materials
