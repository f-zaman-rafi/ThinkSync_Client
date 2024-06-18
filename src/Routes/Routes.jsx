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
import CreateSession from "../Pages/Dashboard/CreateSessions/CreateSession";
import AllStudySessions from "../Pages/Dashboard/AllStudySessionByTutor.jsx/AllStudySessions";
import AdminRoute from "./AdminRoute";
import AllSessionsDash from "../Pages/Dashboard/AllSessionsDash/AllSessionsDash";
import EditSession from "../Pages/Dashboard/EditSession/EditSession";
import UploadMaterials from "../Pages/Dashboard/UploadMaterials/UploadMaterials";
import UploadSelection from "../Pages/Dashboard/UploadMaterials/UploadSelection";
import MaterialsByTutor from "../Pages/Dashboard/ViewAllMaterialsByTutor/MaterialsByTutor";
import UpdateMaterials from "../Pages/Dashboard/UpdateMaterials/UpdateMaterials";
import ViewAllMaterialsByAdmin from "../Pages/Dashboard/ViewAllMaterialsByAdmin/ViewAllMaterialsByAdmin";
import ViewBookedSession from "../Pages/Dashboard/BookedSession/ViewBookedSession";
import CreateNote from "../Pages/Dashboard/CreateNote/CreateNote";
import PersonalNotes from "../Pages/Dashboard/PersonalNotes/PersonalNotes";
import UpdateNote from "../Pages/Dashboard/UpdateNote/UpdateNote";
import StudyMaterials from "../Pages/Dashboard/StudyMaterials/StudyMaterials";
import ReviewAndRating from "../Pages/Dashboard/ReviewAndRating/ReviewAndRating";
import StudentRoute from "./StudentRoute";
import TutorRoute from "./TutorRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage />,
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
            },

        ]
    },
    {
        path: "/dashboard",
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
                path: 'all-materials-admin',
                element: <AdminRoute><ViewAllMaterialsByAdmin /></AdminRoute>

            },

            // Student Route

            {
                path: 'booked-session',
                element: <StudentRoute><ViewBookedSession /></StudentRoute>
            },
            {
                path: 'create-note',
                element: <StudentRoute><CreateNote /></StudentRoute>
            },
            {
                path: 'personal-note',
                element: <StudentRoute><PersonalNotes /></StudentRoute>
            },
            {
                path: 'update-note/:id',
                element: <StudentRoute><UpdateNote /></StudentRoute>
            },
            {
                path: 'study-materials',
                element: <StudentRoute><StudyMaterials /></StudentRoute>
            },
            {
                path: 'review-rating/:id',
                element: <StudentRoute><ReviewAndRating /></StudentRoute>
            },

            // Tutor Route
            {
                path: 'create-session',
                element: <TutorRoute><CreateSession></CreateSession></TutorRoute>
            },

            {
                path: 'sessions-by-tutor',
                element: <TutorRoute><AllStudySessions></AllStudySessions></TutorRoute>
            },
            {
                path: 'upload-materials',
                element: <TutorRoute><UploadMaterials></UploadMaterials></TutorRoute>
            },
            {
                path: 'upload-selection/:id',
                element: <TutorRoute><UploadSelection></UploadSelection></TutorRoute>
            },
            {
                path: 'material',
                element: <TutorRoute><MaterialsByTutor /></TutorRoute>
            },
            {
                path: 'update-materials/:id',
                element: <UpdateMaterials />
            },


        ]
    }
]);
