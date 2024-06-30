import StudySessions from "./StudySessions/StudySessions";
import 'aos/dist/aos.css'
import { Element } from 'react-scroll';
const StudySessionSection = () => {


    return (
        <div className="py-32">
            <Element name="exploreCourses"><p className="lg:text-5xl text-3xl lg:ml-16 ml-5 font-bold py-20 leading-loose ">Our Premium <br /> Online Courses</p></Element>
            <div><StudySessions></StudySessions></div>
        </div>
    );
};

export default StudySessionSection;

