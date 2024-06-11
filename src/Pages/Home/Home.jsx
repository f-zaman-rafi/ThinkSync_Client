import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import StudySessionSection from "./StudySession/StudySessionSection";
import TutorSection from "./TutorSection/Tutors/TutorSection";
import AdminRoute from "../../Routes/AdminRoute";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | ThinkSync</title>
            </Helmet>
            <Banner></Banner>
            <AdminRoute></AdminRoute>
            <StudySessionSection></StudySessionSection>
            <TutorSection></TutorSection>
        </div>
    );
};

export default Home;