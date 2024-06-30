import { useNavigate, useParams } from "react-router-dom";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const ReviewAndRating = () => {
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { email, displayName } = user;

    const { data: session = {}, isLoading: sessionLoading } = useQuery({
        queryKey: ['reviewSession', id],
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
    console.log(bookings)

    const handleSubmitReview = async (event) => {
        event.preventDefault();

        const rating = parseInt(event.target.rating.value);
        const review = event.target.review.value;

        const reviewData = {
            session_id: id,
            studentName: displayName,
            studentEmail: email,
            rating,
            review
        };

        try {
            const res = await axiosCommon.post('/review', reviewData);
            if (res.data.insertedId) {
                navigate('/dashboard');
                toast.success('Review data inserted successfully');
            }
        } catch (error) {
            toast.error('Failed to submit review.');
        } finally {
            document.getElementById('my_modal_1').close();
        }
    };

    if (sessionLoading || bookingsLoading) return <LoadingSpinner />;

    const { title, name, averageRating, description, Registration_Start, Registration_End, Class_Start, Class_End, duration, Fee } = session;

    return (
        <div className="py-32 max-w-5xl mx-auto">
            <h1 className="text-stone-800 font-bold text-xl leading-loose">Session Title: {title}</h1>
            <h1 className="text-stone-800 font-bold text-xl leading-loose">Tutor Name: {name}</h1>
            <h1 className="text-stone-800 font-bold text-xl leading-loose">Rating: {averageRating}</h1>
            <h1 className="text-stone-800 font-bold text-xl leading-loose">Description: {description}</h1>
            <h1 className="text-stone-800 font-bold text-xl leading-loose">Session Start Date: {Registration_Start}</h1>
            <h1 className="text-stone-800 font-bold text-xl leading-loose">Session End Date: {Registration_End}</h1>
            <h1 className="text-stone-800 font-bold text-xl leading-loose">Class Start Date: {Class_Start}</h1>
            <h1 className="text-stone-800 font-bold text-xl leading-loose">Class End Date: {Class_End}</h1>
            <h1 className="text-stone-800 font-bold text-xl leading-loose">Duration: {duration}</h1>
            <h1 className="text-stone-800 font-bold text-xl leading-loose">Registration Fee: ${Fee}</h1>
            <div className="flex justify-center py-5">
                <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>Review</button>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Add Review and Rating</h3>
                        <form onSubmit={handleSubmitReview}>
                            <div className="py-4">
                                <label htmlFor="rating" className="block text-stone-800 font-bold">Rating:</label>
                                <input
                                    type="number"
                                    id="rating"
                                    name="rating"
                                    min="1"
                                    max="5"
                                    required
                                    className="input"
                                />
                            </div>
                            <div className="py-4">
                                <label htmlFor="review" className="block text-stone-800 font-bold">Review:</label>
                                <textarea
                                    id="review"
                                    name="review"
                                    rows="4"
                                    required
                                    className="input"
                                />
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn">Done</button>
                                <button type="button" onClick={() => document.getElementById('my_modal_1').close()} className="btn">Close</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default ReviewAndRating;
