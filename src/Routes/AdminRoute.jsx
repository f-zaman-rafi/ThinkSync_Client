import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

const AdminRoute = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data;
        }
    });
    console.log(user)


    return (
        <div>

        </div>
    );
};

export default AdminRoute;