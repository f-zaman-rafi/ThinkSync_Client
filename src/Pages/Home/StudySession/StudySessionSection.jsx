import StudySessions from "./StudySessions/StudySessions";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";

const StudySessionSection = () => {
    useEffect(() => {
        Aos.init({ duration: 3000 });
    }, []);

    return (
        <div>
            <p data-aos="fade-up" className="font-bold text-4xl lg:text-5xl py-24 text-center text-[#8bfff5]">Study Sessions</p>
            <div><StudySessions></StudySessions></div>
        </div>
    );
};

export default StudySessionSection;