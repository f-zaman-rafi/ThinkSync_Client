import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css'
import Marquee from "react-fast-marquee";



const TutorSection = () => {
    useEffect(() => {
        Aos.init({ duration: 3000 });
    }, []);
    const axiosCommon = useAxiosCommon();
    const { data: tutors = [], isLoading } = useQuery({
        queryKey: ['tutors'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/sessions');
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    // Filter out duplicate tutor names
    const uniqueTutors = Array.from(new Set(tutors.map(tutor => tutor.name)));


    return (
        <div className="py-10">
            <h1 className="font-bold text-4xl lg:text-6xl pb-20 lg:ml-16 ml-5 text-stone-800">Mentors & Sponsors</h1>
            <div className="my-5">
                <Marquee speed={70}>
                    <div className="flex lg:gap-20 gap-12 lg:my-20 my-12 lg:text-3xl font-bold mx-10 font-Playfair">
                        {uniqueTutors.map(tutorName => (
                            <div key={tutorName} className=" py-2 max-w-5xl leading-loose text-stone-800">{tutorName}</div>
                        ))}
                    </div>
                </Marquee>
            </div>
        </div >
    );
};

export default TutorSection;

