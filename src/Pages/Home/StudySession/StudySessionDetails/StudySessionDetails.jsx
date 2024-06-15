import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import toast from "react-hot-toast";
import useAuth from "../../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import useRole from "../../../../Hooks/useRole";

const StudySessionDetails = () => {
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { email } = user;
    const { role } = useRole();
    const [isBooked, setIsBooked] = useState(false);
    const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);
    const [buttonMessage, setButtonMessage] = useState('Book Now!');
    const [averageReviewRating, setAverageReviewRating] = useState(null); // State to hold the average rating

    const { data: session = {}, isLoading: sessionLoading } = useQuery({
        queryKey: ['session', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/sessions/${id}`);
            return data;
        }
    });

    const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
        queryKey: ['bookings', email],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/bookings`, { params: { email } });
            return data;
        }
    });

    const { data: reviews = [] } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/review')
            return data;
        }
    })

    useEffect(() => {
        if (bookings.some(booking => booking.session_id === id)) {
            setIsBooked(true);
        }
    }, [bookings, id]);

    useEffect(() => {
        if (session.Registration_End) {
            const now = new Date();
            const registrationEnd = new Date(session.Registration_End);
            if (now > registrationEnd) {
                setIsRegistrationClosed(true);
            }
        }
    }, [session]);

    useEffect(() => {
        if (isRegistrationClosed) {
            setButtonMessage('Registration Closed');
        } else if (isBooked) {
            if (role === "Admin" || role === "Tutor") {
                setButtonMessage('Admins/Tutors cannot book');
            } else {
                setButtonMessage('Already Booked');
            }
        } else {
            setButtonMessage('Book Now!');
        }
    }, [isRegistrationClosed, isBooked, role]);

    useEffect(() => {
        // Calculate average rating
        const filteredReviews = reviews.filter(review => review.session_id === id);
        if (filteredReviews.length > 0) {
            const totalRating = filteredReviews.reduce((sum, review) => sum + review.rating, 0);
            const avgRating = totalRating / filteredReviews.length;
            setAverageReviewRating(avgRating);
        } else {
            setAverageReviewRating(null); // Reset to null if no reviews found
        }
    }, [reviews, id]);

    const handleBookSession = async () => {
        const bookingData = {
            session_id: id,
            email: email,
            title: session.title,
            name: session.name,
            averageRating: session.averageRating,
            description: session.description,
            Registration_Start: session.Registration_Start,
            Registration_End: session.Registration_End,
            Class_Start: session.Class_Start,
            Class_End: session.Class_End,
            duration: session.duration,
            Fee: session.Fee
        };

        try {
            const res = await axiosCommon.post('/booked', bookingData);
            if (res.data.insertedId) {
                navigate('/dashboard');
                toast.success('Session booked successfully');
            }
        } catch (error) {
            toast.error('Already booked.');
        }
    };

    if (sessionLoading || bookingsLoading) return <LoadingSpinner />;

    const { title, name, description, Registration_Start, Registration_End, Class_Start, Class_End, duration, Fee, _id } = session;

    return (
        <div className="py-32 max-w-5xl mx-auto">
            <h1 className="text-white font-bold text-xl leading-loose">Session Title: {title}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Tutor Name: {name}</h1>
            {averageReviewRating !== null && (
                <h1 className="text-white font-bold text-xl leading-loose">Average Rating: {averageReviewRating.toFixed(1)}</h1>
            )}
            <h1 className="text-white font-bold text-xl leading-loose">Description: {description}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Session Start Date: {Registration_Start}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Session End Date: {Registration_End}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Class Start Date: {Class_Start}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Class End Date: {Class_End}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Duration: {duration}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Registration Fee: ${Fee}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Reviews: </h1>
            <div className=" grid grid-cols-3 gap-5">
                {reviews.map(review => (
                    <div key={review._id}>
                        {review.session_id === _id && (
                            <div className="border-2 p-5">
                                <p>Student: {review.studentName}</p>
                                <p>Rating: {review.rating}</p>
                                <p>Review: {review.review}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="text-center">
                <button
                    className="my-10 btn btn-warning btn-wide"
                    onClick={handleBookSession}
                    disabled={isBooked || isRegistrationClosed || role === "Admin" || role === "Tutor"}
                >
                    {buttonMessage}
                </button>
            </div>
        </div>
    );
};

export default StudySessionDetails;
