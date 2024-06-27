import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const StudyMaterials = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: materials = [], isLoading } = useQuery({
        queryKey: ['materials'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/materials')
            return data;

        }
    });
    const { data: bookedSessions = [] } = useQuery({
        queryKey: ['bookedSessions'],
        queryFn:
            async () => {
                const { data } = await axiosSecure.get(`/booked-sessions?email=${user.email}`);
                return data;
            }
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Study-Materials | ThinkSync</title>
            </Helmet>
            <p className="text-2xl font-bold my-4 mx-4">Study Materials</p>

            {/* Render materials */}
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-2 lg:max-w-7xl mx-8 lg:mx-auto my-20">
                {materials.map(material => (
                    <div key={material._id}>
                        <div>
                            {bookedSessions
                                .map(session => (
                                    <div key={session._id}>
                                        {
                                            session.session_id === material.session_id ? (
                                                <div className="card lg:w-96 w-80 bg-base-100 shadow-xl h-full flex flex-col">
                                                    <figure>
                                                        <img className="px-5 mt-10 h-52" src={material.image} alt="Shoes" />
                                                    </figure>
                                                    <div className="card-body flex flex-col justify-between">
                                                        <h2 className="card-title py-5 text-white font-bold text-xl">{material.title}</h2>
                                                        <a href={material.image} download className="btn btn-outline border-rose-400 btn-sm mr-2">
                                                            Download Image
                                                        </a>
                                                        <a href={material.link} className="btn btn-sm btn-outline border-blue-400 link" target="_blank" rel="noopener noreferrer">
                                                            G-Drive
                                                        </a>
                                                    </div>
                                                </div>

                                            )
                                                :
                                                ''
                                        }
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default StudyMaterials;