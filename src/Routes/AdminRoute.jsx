/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../Pages/Shared/LoadingSpinner/LoadingSpinner";
import useRole from "../Hooks/useRole";


const AdminRoute = ({ children }) => {


    const { role, isLoading } = useRole();
    const location = useLocation();

    if (isLoading) {
        return <p><LoadingSpinner /></p>
    }


    if (role === 'Admin') return children

    return <Navigate to='/sign-in' state={{ from: location }} replace={true}></Navigate>
};

export default AdminRoute;

