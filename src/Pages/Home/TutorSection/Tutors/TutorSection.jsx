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
        <div data-aos="fade-up" className="py-10">
            <h1 className="font-bold text-4xl lg:text-6xl pb-20 text-center text-[#8bfff5]">Mentors</h1>
            <div className="my-10 border-y-[16px] border-dashed border-white ">
                <Marquee speed={70}>
                    <div className="flex gap-20 my-20 text-3xl font-bold mx-10 font-Playfair">
                        {uniqueTutors.map(tutorName => (
                            <div key={tutorName} className=" py-2 max-w-5xl leading-loose text-yellow-400">{tutorName}</div>
                        ))}
                    </div>
                </Marquee>
            </div>
        </div >
    );
};

export default TutorSection;
