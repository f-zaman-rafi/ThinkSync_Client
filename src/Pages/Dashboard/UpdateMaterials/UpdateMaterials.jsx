import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateMaterials = () => {

    const axiosSecure = useAxiosSecure();
    const axiosCommon = useAxiosCommon();

    const { register, handleSubmit } = useForm()
    const { id } = useParams()

    const navigate = useNavigate()

    const onSubmit = async (data) => {

        console.log(data)
        const imgageFile = { image: data.image[0] }
        const res = await axiosCommon.post(image_hosting_api, imgageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const materialsItem = {
                session_id: data.session_id,
                title: data.title,
                email: data.email,
                link: data.link,
                image: res.data.data.display_url
            }
            const materialsRes = await axiosSecure.patch(`/materials/${id}`, materialsItem);
            console.log(materialsRes.data)
            if (materialsRes.data.updatedId) {
                toast.success('Session Material updated successfully');
                navigate('/dashboard');
            } else {
                toast.error('Failed to update session material');
            }
        }
        console.log(res.data)
    }

    const { data: updateMaterial = [], isLoading } = useQuery({
        queryKey: ['updateMaterial', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`materials/${id}`)
            return data
        }
    })

    if (isLoading) return <LoadingSpinner />

    const { title, email, _id, link } = updateMaterial;
    console.log(updateMaterial)



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 max-w-3xl gap-y-5 mx-auto mt-20">
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
                    <input defaultValue={link} {...register("link")} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
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

export default UpdateMaterials;