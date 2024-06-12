/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "../Pages/Shared/LoadingSpinner/LoadingSpinner";



const TutorRoute = ({ children }) => {


    const { role, isLoading } = useRole();
    const location = useLocation();

    if (isLoading) {
        return <p><LoadingSpinner /></p>
    }


    if (role === 'Tutor') return children

    return <Navigate to='/sign-in' state={{ from: location }} replace={true}></Navigate>
};

export default TutorRoute;

