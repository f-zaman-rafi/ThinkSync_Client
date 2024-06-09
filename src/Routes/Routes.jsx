import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import StudySessionDetails from "../Pages/Home/StudySession/StudySessionDetails/StudySessionDetails";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/sessions/:id',
                element: <PrivateRoute><StudySessionDetails></StudySessionDetails></PrivateRoute>
            },
            {
                path: '/sign-up',
                element: <SignUp></SignUp>
            },
            {
                path: '/sign-in',
                element: <SignIn></SignIn>
            }
        ]
    },
]);