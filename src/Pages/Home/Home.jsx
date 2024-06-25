import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import StudySessionSection from "./StudySession/StudySessionSection";
import TutorSection from "./TutorSection/Tutors/TutorSection";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css'


const Home = () => {

    useEffect(() => {
        Aos.init({ duration: 3000 });
    }, []);

    return (
        <div className="overflow-hidden">
            <Helmet>
                <title>Home | ThinkSync</title>
            </Helmet>
            <ScrollToTop />
            <div data-aos="fade-down">
                <Banner ></Banner>
            </div>
            <StudySessionSection></StudySessionSection>
            <TutorSection></TutorSection>
        </div>
    );
};

export default Home;