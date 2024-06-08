import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import StudySessionCard from "./StudySessionCard/StudySessionCard";

const StudySessions = () => {
    const axiosSecure = useAxiosSecure()


    const { data: sessions = [], isLoading } = useQuery({
        queryKey: ['sessions'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/sessions')
            return data
        }
    })
    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    console.log(sessions)


    return (
        <div>
            {
                sessions && sessions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {
                            sessions.map(session => (<StudySessionCard key={session._id} session={session}></StudySessionCard>))
                        }
                    </div>
                )
                    :
                    (
                        <div>
                            <p>No Available Sessions Right now. Please Come again leter</p>
                        </div>
                    )
            }
        </div>
    );
};

export default StudySessions;