import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../Hooks/useAuth";

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
        <div className="my-10 mx-10">
            {/* Render materials */}
            <div className="grid grid-cols-3">
                {materials.map(material => (
                    <div key={material._id}>
                        <div>
                            {bookedSessions
                                .map(session => (
                                    <div key={session._id}>
                                        {
                                            session.session_id === material.session_id ? (
                                                <div className="card w-96 bg-base-100 shadow-xl">
                                                    <figure>
                                                        <img className="px-5 rounded-3xl" src={material.image} alt="Shoes" />
                                                    </figure>
                                                    <div className="card-body">
                                                        <h2 className="card-title">{material.title}</h2>
                                                        <a href={material.image} download className="btn btn-primary btn-sm mr-2">
                                                            Download Image
                                                        </a>
                                                        <a href={material.link} className="leading-loose break-all link" target="_blank" rel="noopener noreferrer">
                                                            {material.link}
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