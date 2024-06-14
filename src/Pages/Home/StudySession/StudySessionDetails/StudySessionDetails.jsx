import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import toast from "react-hot-toast";
import useAuth from "../../../../Hooks/useAuth";
import { useEffect, useState } from "react";

const StudySessionDetails = () => {
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { email } = user;
    const [isBooked, setIsBooked] = useState(false);

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

    useEffect(() => {
        if (bookings.some(booking => booking.session_id === id)) {
            setIsBooked(true);
        }
    }, [bookings, id]);

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

    const { title, name, averageRating, description, Registration_Start, Registration_End, Class_Start, Class_End, duration, Fee } = session;

    return (
        <div className="py-32 max-w-5xl mx-auto">
            <h1 className="text-white font-bold text-xl leading-loose">Session Title: {title}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Tutor Name: {name}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Rating: {averageRating}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Description: {description}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Session Start Date: {Registration_Start}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Session End Date: {Registration_End}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Class Start Date: {Class_Start}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Class End Date: {Class_End}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Duration: {duration}</h1>
            <h1 className="text-white font-bold text-xl leading-loose">Registration Fee: ${Fee}</h1>
            <div className="text-center">
                <button
                    className="my-10 btn btn-warning btn-wide"
                    onClick={handleBookSession}
                    disabled={isBooked}
                >
                    {isBooked ? 'Already Booked' : 'Book Now!'}
                </button>
            </div>
        </div>
    );
};

export default StudySessionDetails;
