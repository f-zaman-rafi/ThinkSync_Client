import { useState } from 'react'; // Added useState import
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import StudySessionCard from "./StudySessionCard/StudySessionCard";
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const StudySessions = () => {
    const axiosSecure = useAxiosSecure()
    const [showAll, setShowAll] = useState(false);
    const maxVisibleSessions = 6;

    const Status = "Approved";

    const { data: sessions = {}, isLoading } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/session/approved?status=${Status}`)
            return data;
        }
    })

    if (isLoading) return <LoadingSpinner />;
    console.log(sessions)


    const displayedSessions = showAll ? sessions : sessions.slice(0, maxVisibleSessions);

    return (
        <div className='mx-10 lg:mx-1'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {displayedSessions.map(session => (
                    <StudySessionCard key={session._id} session={session} />
                ))}
            </div>
            {!showAll && sessions.length > maxVisibleSessions && (
                <button onClick={() => setShowAll(true)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Show All
                </button>
            )}
        </div>
    );
};

export default StudySessions;
