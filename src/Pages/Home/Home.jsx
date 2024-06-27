import { Helmet } from "react-helmet-async";
import StudySessionSection from "./StudySession/StudySessionSection";
import TutorSection from "./TutorSection/Tutors/TutorSection";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css'
import Carousel from "./Banner/Carousel";
import Testimonials from "./Testimonials/Testimonials"
import ContactUs from "./Contact Us/ContactUs";


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
                <Carousel />
            </div>
            <StudySessionSection></StudySessionSection>
            <div data-aos="fade-left" className="my-40"> <Testimonials /></div>
            <TutorSection></TutorSection>
            <div><ContactUs /></div>
        </div>
    );
};

export default Home;