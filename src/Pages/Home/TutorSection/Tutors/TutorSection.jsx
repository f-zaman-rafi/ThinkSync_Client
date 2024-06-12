import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";

const TutorSection = () => {
    const axiosCommon = useAxiosCommon();
    const { data: tutors = [], isLoading } = useQuery({
        queryKey: ['tutors'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/sessions');
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    // Filter out duplicate tutor names
    const uniqueTutors = Array.from(new Set(tutors.map(tutor => tutor.name)));

    return (
        <div>
            <h1 className="text-center font-bold text-5xl">Tutors</h1>
            <div className="grid grid-cols-3 gap-5 max-w-5xl mx-auto my-20">
                {uniqueTutors.map(tutorName => (
                    <div key={tutorName}>
                        <div className="card w-72 glass">
                            <div className="card-body">
                                <h2 className="card-title">{tutorName}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TutorSection;
