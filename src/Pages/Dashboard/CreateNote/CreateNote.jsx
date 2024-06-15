import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CreateNote = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const onSubmit = async (data) => {
        console.log(data)
        try {
            const res = await axiosSecure.post('/note', data);
            if (res.data.insertedId) {
                toast.success('Note created successfully!');
            } else {
                toast.error('Failed to create note.');
            }
        } catch (error) {
            toast.error('An error occurred while creating the note.');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 max-w-3xl gap-y-5 mx-auto mt-20">
                    <label name='email' className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input  {...register("email")} type="text" readOnly value={user.email} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label name='title' className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Title</span>
                        </div>
                        <input  {...register("title", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.title && <span>Title is required</span>}
                    </label>
                    <label name='description' className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <input {...register("description", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.description && <span>Description is required</span>}
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
        </div>
    );
};

export default CreateNote;