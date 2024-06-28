import StudySessions from "./StudySessions/StudySessions";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";

const StudySessionSection = () => {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <div data-aos="fade-up">
            <p className="font-bold text-4xl lg:text-5xl py-24 text-center font-philosopher text-stone-800">Study Sessions</p>
            <div><StudySessions></StudySessions></div>
        </div>
    );
};

export default StudySessionSection;

