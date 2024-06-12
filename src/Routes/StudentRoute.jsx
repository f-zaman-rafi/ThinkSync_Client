/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Pages/Shared/LoadingSpinner/LoadingSpinner";



const StudentRoute = ({ children }) => {


    const { role, isLoading } = useRole();
    const location = useLocation();

    if (isLoading) {
        return <p><LoadingSpinner /></p>
    }


    if (role === 'Student') return children

    return <Navigate to='/sign-in' state={{ from: location }} replace={true}></Navigate>
};

export default StudentRoute;

