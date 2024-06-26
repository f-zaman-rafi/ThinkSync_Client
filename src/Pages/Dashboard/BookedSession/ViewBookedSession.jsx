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
        <div className="min-h-screen pb-28">
            <p className="text-2xl font-bold my-4 mx-4">Your Booked Sessions</p>
            {bookedSessions.length === 0 ? (
                <p className="text-lg">You have not booked any sessions yet.</p>
            ) : (
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 justify-items-center lg:max-w-7xl lg:mx-auto my-20">
                    {bookedSessions.map(session => (
                        <div key={session._id}>

                            <div className="card w-[20rem] bg-base-100 shadow-xl h-full flex flex-col">
                                <div className="card-body">
                                    <h2 className="card-title py-5">{session.title}</h2>
                                    <p className="leading-loose py-5">{session.description}</p>
                                    <div className="card-actions justify-end">
                                        <Link to={`/dashboard/review-rating/${session.session_id}`}><button className="btn btn-ghost btn-outline border-pink-200">Read More</button></Link>
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
