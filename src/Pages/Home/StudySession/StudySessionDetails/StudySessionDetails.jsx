import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";

const StudySessionDetails = () => {
    const { id } = useParams()
    const axiosCommon = useAxiosCommon()

    const { data: session = {}, isLoading } = useQuery({
        queryKey: ['room', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/sessions/${id}`)
            return data
        }
    })




    if (isLoading) return <LoadingSpinner />

    const { title, name, averageRating, description, Registration_Start, Registration_End, Class_Start, Class_End, duration, Fee } = session;

    return (
        <div className="py-32 max-w-5xl mx-auto">
            <h1 className="text-white font-bold text-xl leading-loose">Session Title: {title}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Tutor Name: {name}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Rating: {averageRating}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Description: {description}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Session Start Date: {Registration_Start}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Session End Date: {Registration_End}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Class Start Date: {Class_Start}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Class End Date: {Class_End}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Duration: {duration}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Registration Fee: ${Fee}</h1>
            <div className="text-center"><button className="my-10 btn btn-warning btn-wide"  >Book Now!</button></div>
        </div>
    );
};

export default StudySessionDetails;


