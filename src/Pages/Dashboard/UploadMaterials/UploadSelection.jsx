import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

// Access environment variables
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const UploadSelection = () => {
    const axiosSecure = useAxiosSecure();
    const axiosCommon = useAxiosCommon();
    const { id } = useParams();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);

        const formData = new FormData();
        formData.append("file", data.image[0]);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            const uploadRes = await axiosCommon.post(UPLOAD_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (uploadRes.data && uploadRes.data.secure_url) {
                const materialsItem = {
                    session_id: data.session_id,
                    title: data.title,
                    email: data.email,
                    link: data.link,
                    image: uploadRes.data.secure_url
                };

                const materialsRes = await axiosSecure.post('/materials', materialsItem);

                if (materialsRes.data.insertedId) {
                    toast.success('Session Material added successfully');
                    navigate('/dashboard');
                }
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error('An error occurred. Please try again.');
        }
    };

    const { data: session = {}, isLoading } = useQuery({
        queryKey: ['session', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`sessions/${id}`);
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    const { title, email, _id } = session;


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Helmet>
                <title>Upload-Materials | ThinkSync</title>
            </Helmet>
            <div className="grid lg:grid-cols-2 lg:max-w-3xl gap-y-5 lg:mx-auto mx-8 mt-20 pb-10">
                <label name='session_id' className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Session ID</span>
                    </div>
                    <input  {...register("session_id")} type="text" readOnly value={_id} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                <label name='title' className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Title</span>
                    </div>
                    <input  {...register("title")} value={title} readOnly type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                <label name='email' className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input {...register("email")} value={email} readOnly type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                <label name='link' className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">G-Drive Link</span>
                    </div>
                    <input {...register("link")} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </label>
                <label name='image' className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Upload a file</span>
                    </div>
                    <input  {...register("image")} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text-alt">...</span>
                        <span className="label-text-alt">...</span>
                    </div>
                    <button className="btn btn-outline">Submit</button>
                    <div className="label">
                        <span className="label-text-alt">...</span>
                        <span className="label-text-alt">...</span>
                    </div>
                </label>
            </div >
        </form>
    );
};

export default UploadSelection;