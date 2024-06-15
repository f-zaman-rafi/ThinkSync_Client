import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const UpdateNote = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: note, isLoading, error } = useQuery({
        queryKey: ['note', id],
        queryFn:
            async () => {
                const { data } = await axiosSecure.get(`/note/${id}`);
                return data;
            }
    });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const updatedNote = {
                title: data.title,
                description: data.description,
                email: user.email
            };
            const response = await axiosSecure.patch(`/note/${id}`, updatedNote);
            console.log(response.data);
            navigate('/dashboard/personal-note')
            toast.success("Note updated successfully");
        } catch (error) {
            console.error("Error updating note:", error);
            toast.error("Failed to update note");
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 max-w-3xl gap-y-5 mx-auto mt-20">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input {...register("email")} type="text" readOnly value={user.email} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Title</span>
                        </div>
                        <input {...register("title", { required: true })} type="text" defaultValue={note.title} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.title && <span>Title is required</span>}
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <input {...register("description", { required: true })} type="text" defaultValue={note.description} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.description && <span>Description is required</span>}
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text-alt">...</span>
                            <span className="label-text-alt">...</span>
                        </div>
                        <button type="submit" className="btn btn-outline">Update</button>
                        <div className="label">
                            <span className="label-text-alt">...</span>
                            <span className="label-text-alt">...</span>
                        </div>
                    </label>
                </div>
            </form>
        </div>
    );
};

export default UpdateNote;
