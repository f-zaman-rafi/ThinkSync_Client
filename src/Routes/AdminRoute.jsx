/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const AdminRoute = ({ children }) => {

    const { user } = useAuth();


    if (user.role === 'Admin') return children

    return <Navigate to='/sign-in' state={{ from: location }} replace={true}></Navigate>
};

export default AdminRoute;