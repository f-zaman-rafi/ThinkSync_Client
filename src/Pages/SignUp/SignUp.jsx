/* eslint-disable react/no-unescaped-entities */

import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

const SignUp = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const { createUser, signInWithGoogle, signInWithGithub, updateUserProfile, setUser } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const axiosCommon = useAxiosCommon()


    const onSubmit = data => {
        console.log(data);

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                localStorage.setItem('token', loggedUser.stsTokenManager.accessToken);
                updateUserProfile(data.username)
                    .then(() => {
                        setUser({ ...loggedUser, displayName: data.username, role: data.role });

                        const userInfo = { name: data.username, email: data.email, role: data.role };
                        axiosCommon.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('Data inserted into the database successfully');
                                    const from = location.state?.from?.pathname || '/';
                                    navigate(from);
                                    toast.success('Sign-Up Successfully');
                                }
                            })
                            .catch(error => {
                                console.error('Error inserting data into database:', error);
                                toast.error('Error inserting data into database');
                            });
                    })
                    .catch(error => {
                        console.error('Error updating user profile:', error);
                        toast.error('Error updating user profile');
                    });
            })
            .catch(error => {
                console.error('Error creating user:', error);
                toast.error(error.message);
            });
    };


    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;
            localStorage.setItem('token', user.stsTokenManager.accessToken);
            const userInfo = {
                email: user?.email,
                name: user?.displayName,
                role: "Student"
            };
            await axiosCommon.post('/users', userInfo);
            const from = location.state?.from?.pathname || '/';
            navigate(from);
            toast.success('Sign-In with Google Successfully');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const handleGithubSignIn = async () => {
        try {
            const result = await signInWithGithub();
            const user = result.user;
            localStorage.setItem('token', user.stsTokenManager.accessToken);
            const userInfo = {
                email: user?.email,
                name: user?.displayName,
                role: "Student"
            };
            await axiosCommon.post('/users', userInfo);
            const from = location.state?.from?.pathname || '/';
            navigate(from);
            toast.success('Sign-In with Github Successfully');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };


    return (
        <>

            <Helmet>
                <title>Sign Up | ThinkSync</title>
            </Helmet>

            <div className="py-20">
                <div className="w-full max-w-sm p-6 m-auto mx-auto rounded-lg shadow-md bg-gray-100 bg-opacity-10">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src="/public/sync.svg" alt="" />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">

                        <div>
                            <label name="username" className="block text-sm text-gray-800 dark:text-gray-200">Username</label>
                            <input
                                type="text"
                                {...register("username", {
                                    required: "Username is required",
                                    minLength: {
                                        value: 3,
                                        message: "Username must be at least 3 characters long"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Username cannot exceed 20 characters"
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9_]+$/,
                                        message: "Username can only contain letters, numbers, and underscores"
                                    }
                                })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.username?.type === 'required' && <span className="text-red-500 ml-1 text-xs">{errors.username.message}</span>}
                            {errors.username?.type === 'minLength' && <span className="text-red-500 ml-1 text-xs">{errors.username.message}</span>}
                            {errors.username?.type === 'maxLength' && <span className="text-red-500 ml-1 text-xs">{errors.username.message}</span>}
                            {errors.username?.type === 'pattern' && <span className="text-red-500 ml-1 text-xs">{errors.username.message}</span>}
                        </div>


                        <div className="mt-4">
                            <label name="email" className="block text-sm text-gray-800 dark:text-gray-200">Email</label>
                            <input
                                type="text"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email address"
                                    }
                                })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.email?.type === 'required' && <span className="text-red-500 ml-1 text-xs">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="text-red-500 ml-1 text-xs">{errors.email.message}</span>}
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center justify-between">
                                <label name="password" className="block text-sm text-gray-800 dark:text-gray-200">Password</label>
                                < p href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:underline">Forget Password?</p>
                            </div>

                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    validate: {
                                        minLength: value => value.length >= 8 || "Must be at least 8 characters long",
                                        hasLowerCase: value => /[a-z]/.test(value) || "Must contain at least one lowercase letter",
                                        hasUpperCase: value => /[A-Z]/.test(value) || "Must contain at least one uppercase letter",
                                        hasNumber: value => /\d/.test(value) || "Must contain at least one number",
                                        hasSpecialChar: value => /[@$!%*?&]/.test(value) || "Must contain at least one special character",
                                    }
                                })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.password && <span className="text-red-500 ml-1 text-xs">{errors.password.message}</span>}
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center justify-between">
                                <label name="role" className="block text-sm text-gray-800 dark:text-gray-200">Select your role here</label>
                            </div>

                            <select
                                id="role"
                                className="select w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                {...register("role", { required: "Role is required" })}
                            >
                                <option value="" selected disabled>Pick your Role</option>
                                <option value="Admin" disabled>Admin</option>
                                <option value="Tutor">Tutor</option>
                                <option value="Student">Student</option>
                            </select>
                            {errors && errors.role && <span className="text-red-500 ml-1 text-xs">{errors.role.message}</span>}
                        </div>

                        <div className="mt-6">
                            <input className="btn w-full border-stone-600 btn-outline" type="submit" value="Sign Up" />
                        </div>
                    </form>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                        <p href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                            or login with Social Media
                        </p>

                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                    </div>

                    <div className="mt-5 space-y-2">
                        <div data-aos="fade-left"><button onClick={handleGoogleSignIn} className="btn  w-full btn-outline border-r-sky-400 border-t-red-400 border-b-green-400 border-l-yellow-400">Continue with
                            <span className="text-red-500">G</span>
                            <span className="text-yellow-500">o</span>
                            <span className="text-blue-500">o</span>
                            <span className="text-red-500">g</span>
                            <span className="text-green-500">l</span>
                            <span className="text-yellow-500">e</span></button></div>
                        <div data-aos="fade-right"><button onClick={handleGithubSignIn} className="btn w-full btn-outline border-b-purple-500 border-t-green-500 border-l-black border-r-white
">Continue with
                            <span className="text-black">G</span>
                            <span className="text-green-500">i</span>
                            <span className="text-yellow-500">t</span>
                            <span className="text-purple-500">H</span>
                            <span className="text-yellow-500">u</span>
                            <span className="text-blue-500">b</span>

                        </button></div>
                    </div>

                    <p className="mt-8 text-xs font-light text-center text-gray-400"> Already have an account? <Link to='/sign-in'>< p href="#" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Login</p></Link></p >
                </div >
            </div >
        </>
    );
};

export default SignUp;