import { Outlet } from "react-router-dom";
import DashNav from "../Pages/Dashboard/DashNav/DashNav";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { Helmet } from "react-helmet-async";
import AnimatedCursor from "react-animated-cursor"

const Dashboard = () => {
    return (
        <div className="lg:max-w-7xl mx-auto">
            <Helmet>
                <title>Dashboard | ThinkSync</title>
            </Helmet>
            <ScrollToTop />
            <AnimatedCursor
                innerSize={0}
                outerSize={10}
                color='37, 171, 224'
                outerAlpha={0.6}
                showSystemCursor={true}
                trailingSpeed={8}
                outerScale={2}
                clickables={[
                    'a',
                    'input[type="text"]',
                    'input[type="email"]',
                    'input[type="number"]',
                    'input[type="submit"]',
                    'input[type="image"]',
                    'label[for]',
                    'select',
                    'textarea',
                    'button',
                    '.link',
                ]}
            />
            <DashNav></DashNav>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;

