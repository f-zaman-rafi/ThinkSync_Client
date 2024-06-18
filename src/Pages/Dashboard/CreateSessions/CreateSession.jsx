import { useForm } from "react-hook-form";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const CreateSession = () => {

    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm()

    const axiosCommon = useAxiosCommon();
    const navigate = useNavigate()
    const { user } = useAuth();

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const res = await axiosCommon.post('/sessions', data);
            console.log(res);
            if (res.data.insertedId) {
                console.log('Data inserted into the database Successfully');
                navigate('/dashboard');
                toast.success('Session added successfully');
            }
        } catch (error) {
            console.error('Error adding session:', error);
            toast.error('Failed to add session');
        }
    };


    return (
        <div className="">
            <h1 className="text-5xl font-bold text-center pt-10">Create Session</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mx-20 my-10 grid lg:grid-cols-3 gap-y-5 gap-x-10">

                    {/* title */}

                    <div className="form-control">
                        <label name="title" className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text"   {...register("title", { required: "Title is require" })} placeholder="title" className="input input-bordered" />
                        {errors.title?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.title.message}</span>}
                    </div>

                    {/* Tutor Name */}

                    <div className="form-control">
                        <label name="name" className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" value={user.displayName} readOnly {...register("name", { required: "name is require" })} placeholder="name" className="input input-bordered" />
                        {errors.name?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.name.message}</span>}
                    </div>

                    {/* Tutor email */}

                    <div className="form-control">
                        <label name="email" className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" value={user.email} readOnly {...register("email", { required: "email is require" })} placeholder="email" className="input input-bordered" />
                        {errors.email?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.email.message}</span>}
                    </div>

                    {/* Session Description */}

                    <div className="form-control">
                        <label name="description" className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text"   {...register("description", { required: "description is require" })} placeholder="description" className="input input-bordered" />
                        {errors.description?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.description.message}</span>}
                    </div>

                    {/* Registration Start Date */}

                    <div className="form-control">
                        <label name="Registration_Start" className="label">
                            <span className="label-text">Registration_Start</span>
                        </label>
                        <input type="date"   {...register("Registration_Start", { required: "Registration_Start is require" })} placeholder="Registration_Start" className="input input-bordered" />
                        {errors.Registration_Start?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.Registration_Start.message}</span>}
                    </div>

                    {/* Registration End Date */}

                    <div className="form-control">
                        <label name="Registration_End" className="label">
                            <span className="label-text">Registration_End</span>
                        </label>
                        <input type="date"   {...register("Registration_End", { required: "Registration_End is require" })} placeholder="Registration_End" className="input input-bordered" />
                        {errors.Registration_End?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.Registration_End.message}</span>}
                    </div>

                    {/* Class Start Date */}

                    <div className="form-control">
                        <label name="Class_Start" className="label">
                            <span className="label-text">Class_Start</span>
                        </label>
                        <input type="date"   {...register("Class_Start", { required: "Class_Start is require" })} placeholder="Class_Start" className="input input-bordered" />
                        {errors.Class_Start?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.Class_Start.message}</span>}
                    </div>

                    {/* Class End Date */}

                    <div className="form-control">
                        <label name="Class_End" className="label">
                            <span className="label-text">Class_End</span>
                        </label>
                        <input type="date"   {...register("Class_End", { required: "Class_End is require" })} placeholder="Class_End" className="input input-bordered" />
                        {errors.Class_End?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.Class_End.message}</span>}
                    </div>

                    {/* Session Duration */}

                    <div className="form-control">
                        <label name="duration" className="label">
                            <span className="label-text">Duration</span>
                        </label>
                        <input type="text"   {...register("duration", { required: "duration is require" })} placeholder="duration" className="input input-bordered" />
                        {errors.duration?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.duration.message}</span>}
                    </div>

                    {/* Registration Fee */}

                    <div className="form-control">
                        <label name="Fee" className="label">
                            <span className="label-text">Fee</span>
                        </label>
                        <input type="number" readOnly value='0'  {...register("Fee", { required: "Fee is require" })} placeholder="Fee" className="input input-bordered" />
                        {errors.Fee?.type === 'required' && <span className="text-red-500 text-xs mt-2 ml-2">{errors.Fee.message}</span>}
                    </div>

                    {/* Status */}

                    <div className="form-control">
                        <label name="Status" className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <input type="text" value='Pending' readOnly {...register("Status")} placeholder="Status" className="input input-bordered" />

                    </div>

                </div>

                <div className="text-center"><input className="btn btn-outline btn-wide btn-circle" type="submit" /></div>
            </form>
        </div>
    );
};

export default CreateSession;



// 13.( Create study session ) Tutor will create a session with the following
// fields:
// a. Session Title
// b. Tutor name read-only ( Logged in user name )
// c. Tutor email read-only ( Logged in user email)
// d. session Description
// e. Registration start date
// f. Registration end date
// g. Class start date
// h. Class end date
// i. Session duration
// j. Registration fee read-only ( default 0 ) ( only admin can
// modify this field, just set it to 0 )
// k. Status ( default pending )
// l. Any other necessary info if you need