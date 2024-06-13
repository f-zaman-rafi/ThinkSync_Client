import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import StudySessionDetails from "../Pages/Home/StudySession/StudySessionDetails/StudySessionDetails";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import ModalTest from "../Pages/Dashboard/ModalTest";
import CreateSession from "../Pages/Dashboard/CreateSessions/CreateSession";
import AllStudySessions from "../Pages/Dashboard/AllStudySessionByTutor.jsx/AllStudySessions";
import AdminRoute from "./AdminRoute";
import AllSessionsDash from "../Pages/Dashboard/AllSessionsDash/AllSessionsDash";
import EditSession from "../Pages/Dashboard/EditSession/EditSession";

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
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [

            // Admin Routes

            {
                path: "all-users",
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'all-sessions-dash',
                element: <AdminRoute><AllSessionsDash></AllSessionsDash></AdminRoute>
            },
            {
                path: 'all-sessions-dash/:id',
                element: <AdminRoute><EditSession></EditSession></AdminRoute>
            },
            {
                path: 'modalTest',
                element: <ModalTest></ModalTest>
            },
            {
                path: 'create-session',
                element: <CreateSession></CreateSession>
            },
            {
                path: 'sessions-by-tutor',
                element: <AllStudySessions></AllStudySessions>
            },
        ]
    }
]);
