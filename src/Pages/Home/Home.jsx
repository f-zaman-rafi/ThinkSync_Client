import { Helmet } from "react-helmet-async";
import StudySessionSection from "./StudySession/StudySessionSection";
import TutorSection from "./TutorSection/Tutors/TutorSection";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css'
import Testimonials from "./Testimonials/Testimonials"
import ContactUs from "./Contact Us/ContactUs";
import NewBanner from "./Banner/NewBanner";
import CourseExpect from "./CourseExpect/CourseExpect";
import AnimatedCursor from "react-animated-cursor"
import Counts from "./Counts/Counts";


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
            <NewBanner />
            <CourseExpect />
            <Counts />
            <StudySessionSection></StudySessionSection>
            <div className="my-40"> <Testimonials /></div>
            <TutorSection></TutorSection>
            <div><ContactUs /></div>
        </div>
    );
};

export default Home;