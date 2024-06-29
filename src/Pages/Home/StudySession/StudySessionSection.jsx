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
            <p className="font-bold text-4xl lg:text-6xl py-24 text-center font-stardos text-stone-800">Study Sessions</p>
            <div><StudySessions></StudySessions></div>
        </div>
    );
};

export default StudySessionSection;

