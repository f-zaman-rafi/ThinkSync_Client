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
                <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
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

                    <div className="flex items-center mt-6 -mx-2">
                        <button onClick={handleGoogleSignIn} type="button" className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
                            <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z">
                                </path>
                            </svg>

                            <span className="hidden mx-2 sm:inline">Sign in with Google</span>
                        </button>

                        <button onClick={handleGithubSignIn}>
                            < p href="#" className="p-2 mx-2 text-sm font-medium text-gray-500 transition-colors duration-300 transform bg-gray-300 rounded-lg hover:bg-gray-200">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.167 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.152-1.11-1.459-1.11-1.459-.908-.62.069-.607.069-.607 1.004.07 1.533 1.033 1.533 1.033.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.635-1.338-2.22-.252-4.555-1.11-4.555-4.942 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.854.004 1.717.115 2.524.338 1.909-1.297 2.748-1.026 2.748-1.026.546 1.377.203 2.394.1 2.647.64.698 1.028 1.591 1.028 2.682 0 3.842-2.338 4.687-4.566 4.935.36.31.68.92.68 1.855 0 1.339-.012 2.422-.012 2.752 0 .268.18.58.688.481A10.015 10.015 0 0022 12c0-5.523-4.477-10-10-10z"></path>
                                </svg>

                            </p>
                        </button>
                    </div >

                    <p className="mt-8 text-xs font-light text-center text-gray-400"> Already have an account? <Link to='/sign-in'>< p href="#" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Login</p></Link></p >
                </div >
            </div >
        </>
    );
};

export default SignUp;