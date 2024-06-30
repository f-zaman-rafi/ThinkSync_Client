import StudySessions from "./StudySessions/StudySessions";
import 'aos/dist/aos.css'

const StudySessionSection = () => {


    return (
        <div className="py-32">
            <p className="lg:text-5xl text-3xl ml-16 font-bold py-20 leading-loose ">Our Premium <br /> Online Courses</p>
            <div><StudySessions></StudySessions></div>
        </div>
    );
};

export default StudySessionSection;

