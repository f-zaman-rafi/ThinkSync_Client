import { useState } from 'react'; // Added useState import
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import StudySessionCard from "./StudySessionCard/StudySessionCard";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";

const StudySessions = () => {
    const axiosCommon = useAxiosCommon();
    const [showAll, setShowAll] = useState(false);
    const maxVisibleSessions = 6;

    const { data: sessions = [], isLoading } = useQuery({
        queryKey: ['sessions'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/sessions');
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;


    const displayedSessions = showAll ? sessions : sessions.slice(0, maxVisibleSessions);

    return (
        <div>
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
