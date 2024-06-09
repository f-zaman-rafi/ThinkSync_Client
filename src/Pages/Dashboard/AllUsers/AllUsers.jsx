import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    // const [showAll, setShowAll] = useState(false);
    // const maxVisibleSessions = 6;

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;
    return (
        <div>
            <h1>{users.length}</h1>
        </div>
    );
};

export default AllUsers;