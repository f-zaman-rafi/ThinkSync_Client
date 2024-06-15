import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";


const ViewBookedSession = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { email } = user

    const { data: bookedSessions = [], isLoading, isError } = useQuery({
        queryKey: ['bookedSessions'],
        queryFn:
            async () => {
                const { data } = await axiosSecure.get(`/booked-sessions?email=${email}`);
                return data;
            }
    });



    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div>Error fetching booked sessions!</div>;
    }

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Your Booked Sessions</h1>
            {bookedSessions.length === 0 ? (
                <p className="text-lg">You have not booked any sessions yet.</p>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {bookedSessions.map(session => (
                        <div key={session._id}>

                            <div className="card w-96 bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title py-5">{session.title}</h2>
                                    <p className="leading-loose ">{session.description}</p>
                                    <div className="card-actions justify-end">
                                        <Link to={`/sessions/${session.session_id}`}><button className="btn btn-primary">Read More</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewBookedSession;
