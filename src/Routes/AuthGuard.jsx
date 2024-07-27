/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Pages/Shared/LoadingSpinner/LoadingSpinner";

const AuthGuard = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <p><LoadingSpinner /></p>
    }
    if (user) {
        return <Navigate to='/' state={{ from: location }} replace={true}></Navigate>
    }
    return children;
};

export default AuthGuard;