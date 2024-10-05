import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import LiveChat from "../Chat/LiveChat";

const Main = () => {
    return (
        <div className="max-w-screen-2xl mx-auto overflow-x-hidden">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <LiveChat />
        </div>
    );
};

export default Main;