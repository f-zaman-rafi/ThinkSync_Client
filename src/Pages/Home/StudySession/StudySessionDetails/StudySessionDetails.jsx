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

    const { sessionTitle, tutorName, averageRating, sessionDescription, registrationStartDate, registrationEndDate, classStartTime, classEndDate, sessionDuration, registrationFee } = session;

    return (
        <div className="py-32 max-w-5xl mx-auto">
            <h1 className="text-white font-bold text-xl leading-loose">Session Title: {sessionTitle}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Tutor Name: {tutorName}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Rating: {averageRating}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Description: {sessionDescription}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Session Start Date: {registrationStartDate}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Session End Date: {registrationEndDate}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Class Start Date: {classStartTime}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Class End Date: {classEndDate}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Duration: {sessionDuration}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Registration Fee: {registrationFee}</h1>
        </div>
    );
};

export default StudySessionDetails;


