import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const ViewAllMaterialsByAdmin = () => {
    const axiosSecure = useAxiosSecure()

    const { data: materials = [], isLoading } = useQuery({
        queryKey: ['materials'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/materials')
            return data;

        }
    });

    if (isLoading) return <LoadingSpinner />;
    console.log(materials)


    return (
        <div>

        </div>
    );
};

export default ViewAllMaterialsByAdmin;