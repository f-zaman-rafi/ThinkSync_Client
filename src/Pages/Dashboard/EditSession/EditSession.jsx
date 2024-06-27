import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const EditSession = () => {

    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm()

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const { id } = useParams()

    const { data: session = [], isLoading } = useQuery({
        queryKey: ['session', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`sessions/${id}`)
            return data
        }
    })

    if (isLoading) return <LoadingSpinner />

    const { title, name, email, description, Registration_Start, Registration_End, Class_Start, Class_End, duration, Fee } = session;



    const onSubmit = async (data) => {
        try {
            console.log(data);
            const { description, Registration_Start, Registration_End, Class_Start, Class_End, duration, Fee } = data;
            const requestData = {
                description: description,
                Registration_Start: Registration_Start,
                Registration_End: Registration_End,
                Class_Start: Class_Start,
                Class_End: Class_End,
                duration: duration,
                Fee: Fee
            };
            const res = await axiosSecure.patch(`/sessions/edited/${session._id}`, requestData);
            console.log(res.data)
            if (res.data === "Session Edited successfully") {
                console.log('Data updated in the database Successfully');
                toast.success('Session updated successfully');
                navigate('/dashboard/all-sessions-dash');
            }
        } catch (error) {
            console.error('Error updating session:', error);
            toast.error('Failed to update session');
        }
    };



    return (

        <div className=" pb-12">
            <p className="text-2xl font-bold my-4 mx-4">Edit Session</p>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mx-20 my-10 grid lg:grid-cols-3 gap-y-5 gap-x-10">

                    {/* title */}

                    <div className="form-control">
                        <label name="title" className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" defaultValue={title} {...register("title", { required: "Title is require" })} placeholder="title" className="input input-bordered" />
                        {errors.title?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.title.message}</span>}
                    </div>

                    {/* Tutor Name */}

                    <div className="form-control">
                        <label name="name" className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" value={name} readOnly {...register("name", { required: "name is require" })} placeholder="name" className="input input-bordered" />
                        {errors.name?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.name.message}</span>}
                    </div>

                    {/* Tutor email */}

                    <div className="form-control">
                        <label name="email" className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" value={email} readOnly {...register("email", { required: "email is require" })} placeholder="email" className="input input-bordered" />
                        {errors.email?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.email.message}</span>}
                    </div>

                    {/* Session Description */}

                    <div className="form-control">
                        <label name="description" className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text" defaultValue={description}   {...register("description", { required: "description is require" })} placeholder="description" className="input input-bordered" />
                        {errors.description?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.description.message}</span>}
                    </div>

                    {/* Registration Start Date */}

                    <div className="form-control">
                        <label name="Registration_Start" className="label">
                            <span className="label-text">Registration_Start</span>
                        </label>
                        <input type="date" defaultValue={Registration_Start}  {...register("Registration_Start", { required: "Registration_Start is require" })} placeholder="Registration_Start" className="input input-bordered" />
                        {errors.Registration_Start?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.Registration_Start.message}</span>}
                    </div>

                    {/* Registration End Date */}

                    <div className="form-control">
                        <label name="Registration_End" className="label">
                            <span className="label-text">Registration_End</span>
                        </label>
                        <input type="date" defaultValue={Registration_End} {...register("Registration_End", { required: "Registration_End is require" })} placeholder="Registration_End" className="input input-bordered" />
                        {errors.Registration_End?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.Registration_End.message}</span>}
                    </div>

                    {/* Class Start Date */}

                    <div className="form-control">
                        <label name="Class_Start" className="label">
                            <span className="label-text">Class_Start</span>
                        </label>
                        <input type="date" defaultValue={Class_Start} {...register("Class_Start", { required: "Class_Start is require" })} placeholder="Class_Start" className="input input-bordered" />
                        {errors.Class_Start?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.Class_Start.message}</span>}
                    </div>

                    {/* Class End Date */}

                    <div className="form-control">
                        <label name="Class_End" className="label">
                            <span className="label-text">Class_End</span>
                        </label>
                        <input type="date" defaultValue={Class_End}  {...register("Class_End", { required: "Class_End is require" })} placeholder="Class_End" className="input input-bordered" />
                        {errors.Class_End?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.Class_End.message}</span>}
                    </div>

                    {/* Session Duration */}

                    <div className="form-control">
                        <label name="duration" className="label">
                            <span className="label-text">Duration</span>
                        </label>
                        <input type="text" defaultValue={duration}  {...register("duration", { required: "duration is require" })} placeholder="duration" className="input input-bordered" />
                        {errors.duration?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.duration.message}</span>}
                    </div>

                    {/* Registration Fee */}

                    <div className="form-control">
                        <label name="Fee" className="label">
                            <span className="label-text">Fee</span>
                        </label>
                        <input type="number" defaultValue={Fee}  {...register("Fee", { required: "Fee is require" })} placeholder="Fee" className="input input-bordered" />
                        {errors.Fee?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.Fee.message}</span>}
                    </div>



                </div>

                <div className="text-center"><input className="btn btn-outline btn-wide btn-circle" type="submit" /></div>
            </form>
        </div>
    );
};

export default EditSession;



