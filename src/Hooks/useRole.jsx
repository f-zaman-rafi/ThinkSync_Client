import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: userData = {}, isLoading } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user?email=${user.email}`);
            return data;
        }
    });

    const role = userData?.[0]?.role || 'Student';

    return { role, isLoading };
};

export default useRole;
