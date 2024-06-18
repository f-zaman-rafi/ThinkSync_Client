import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import toast from "react-hot-toast";
import useAuth from "../../../../Hooks/useAuth";
import useRole from "../../../../Hooks/useRole";
import { Elements, useStripe, CardElement, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);

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
    const [averageReviewRating, setAverageReviewRating] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const axiosSecure = useAxiosSecure();

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
            const { data } = await axiosCommon.get(`/booked-sessions`, { params: { email } });
            return data;
        }
    });
    console.log(bookings)
    const { data: reviews = [] } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/review')
            return data;
        }
    });

    useEffect(() => {
        console.log('Bookings:', bookings);
        console.log('Current Session ID:', id);
        if (bookings.some(booking => booking.session_id === id)) {
            setIsBooked(true);
            console.log('User is booked for this session');
        } else {
            setIsBooked(false);
            console.log('User is not booked for this session');
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
        const filteredReviews = reviews.filter(review => review.session_id === id);
        if (filteredReviews.length > 0) {
            const totalRating = filteredReviews.reduce((sum, review) => sum + review.rating, 0);
            const avgRating = totalRating / filteredReviews.length;
            setAverageReviewRating(avgRating);
        } else {
            setAverageReviewRating(null);
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

    const openPaymentModal = async () => {
        try {
            const { data } = await axiosSecure.post('/create-payment-intent', { fee: session.Fee });
            if (data.clientSecret) {
                setShowPaymentModal(true);
            } else {
                toast.error('Failed to create payment intent.');
            }
        } catch (error) {
            console.error('Error creating payment intent:', error);
            toast.error('Error creating payment intent. Please try again.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            return;
        }

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                setError(error.message);
                return;
            }

            const { data } = await axiosSecure.post('/create-payment-intent', { fee: session.Fee });

            if (!data.clientSecret) {
                toast.error('Failed to create payment intent.');
                return;
            }

            const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (paymentError) {
                setError(paymentError.message);
                toast.error('Payment failed. Please try again.');
            } else if (paymentIntent.status === 'succeeded') {
                handleBookSession();
                toast.success('Payment successful!');
                setShowPaymentModal(false);
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Error processing payment. Please try again.');
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
            <div className="grid lg:grid-cols-3 gap-5">
                {reviews.map(review => (
                    <div key={review._id}>
                        {review.session_id === _id && (
                            <div className="border-2 p-5">
                                <p>Student: {review.studentName}</p>
                                <p>{review.review}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="text-center">
                <button
                    className="my-10 btn btn-warning btn-wide"
                    onClick={() => {
                        if (Fee > 0) {
                            openPaymentModal();
                        } else {
                            handleBookSession();
                        }
                    }}
                    disabled={isBooked || isRegistrationClosed || role === "Admin" || role === "Tutor"}
                >
                    {buttonMessage}
                </button>
            </div>

            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Payment</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#424770',
                                                '::placeholder': {
                                                    color: '#aab7c4',
                                                },
                                            },
                                            invalid: {
                                                color: '#9e2146',
                                            },
                                        },
                                    }}
                                    className="w-full py-2 px-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <p className="text-red-500 pb-2">{error}</p>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setShowPaymentModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"

                                >
                                    Pay ${Fee}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

const StudySessionDetailsWithStripe = () => (
    <Elements stripe={stripePromise}>
        <StudySessionDetails />
    </Elements>
);

export default StudySessionDetailsWithStripe;
