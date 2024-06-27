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
        <div className=' max-w-7xl mx-auto'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedSessions.map(session => (
                    <div className="flex flex-col h-full" key={session._id}>
                        <StudySessionCard session={session} />
                    </div>
                ))}
            </div>

            <div className='flex justify-center pt-10 pb-28'>
                {!showAll && sessions.length > maxVisibleSessions && (
                    <button onClick={() => setShowAll(true)} className="mt-10 btn-outline border-4 text-xl border-[#ff0000] text-white py-3 px-10 rounded-xl hover:bg-black hover:text-white hover:border-[#FFFF00]">
                        Show All
                    </button>
                )}
            </div>
        </div>
    );
};

export default StudySessions;
