/* eslint-disable react/no-unescaped-entities */

import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signIn, signInWithGoogle, signInWithGithub } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();
    const axiosCommon = useAxiosCommon();

    const onSubmit = async (data) => {
        try {
            // Attempt to sign in the user with the provided email and password
            const result = await signIn(data.email, data.password);

            // Retrieve the signed-in user's details
            const loggedUser = result.user;

            // Store the user's access token in the local storage
            localStorage.setItem('token', loggedUser.stsTokenManager.accessToken);

            // Determine the redirect path after sign-in (default to home page if not specified)
            const from = location.state?.from?.pathname || '/';

            // Navigate to the specified path
            navigate(from);

            // Show a success toast notification
            toast.success('Sign-In Successfully');

            // Log the signed-in user's details to the console
            console.log(loggedUser);
        } catch (error) {
            // Log the error to the console for debugging
            console.error(error);

            // Show a failure toast notification
            toast.error('Sign-In Failed');

            navigate('/');
        }
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
            navigate('/');
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
                <title>Sign In | ThinkSync</title>
            </Helmet>

            <div className="py-20">
                <div className="w-full max-w-sm p-6 m-auto mx-auto  rounded-lg shadow-md border-2 ">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-32 sm:h-8" src="data:image/svg+xml,%3Csvg%20class%3D%22w-6%20h-6%20text-yellow-400%20dark%3Atext-yellow%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%3E%0A%20%20%20%20%3Cpath%20stroke%3D%22%23D2691E%22%20stroke-linecap%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M8.737%208.737a21.49%2021.49%200%200%201%203.308-2.724m0%200c3.063-2.026%205.99-2.641%207.331-1.3%201.827%201.828.026%206.591-4.023%2010.64-4.049%204.049-8.812%205.85-10.64%204.023-1.33-1.33-.736-4.218%201.249-7.253m6.083-6.11c-3.063-2.026-5.99-2.641-7.331-1.3-1.827%201.828-.026%206.591%204.023%2010.64m3.308-9.34a21.497%2021.497%200%200%201%203.308%202.724m2.775%203.386c1.985%203.035%202.579%205.923%201.248%207.253-1.336%201.337-4.245.732-7.295-1.275M14%2012a2%202%200%201%201-4%200%202%202%200%200%201%204%200Z%22%20%2F%3E%0A%3C%2Fsvg%3E" alt="thinkSync" />

                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                        <div className="mt-4">
                            <label name="email" className="block text-sm text-gray-900 font-bold ">Email</label>
                            <input
                                type="text"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email address"
                                    }
                                })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-transparent  dark:border-gray-900 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.email && <span className="text-red-600 ml-1 text-xs">{errors.email.message}</span>}
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center justify-between">
                                <label name="password" className="block text-sm text-gray-900 font-bold">Password</label>
                                <p className="text-xs text-gray-900  hover:underline">Forget Password?</p>
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
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-transparent  dark:border-gray-900 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.password && <span className="text-red-600 ml-1 text-xs">{errors.password.message}</span>}
                        </div>

                        <div className="mt-6">
                            <input className="btn w-full border-stone-600 btn-outline" type="submit" value="Sign In" />
                        </div>
                    </form>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-900 lg:w-1/5"></span>
                        <p className="text-xs text-center text-gray-700 uppercase  hover:underline">
                            or login with Social Media
                        </p>
                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                    </div>

                    <div className="mt-5 space-y-2">
                        <div ><button onClick={handleGoogleSignIn} className="btn  w-full btn-outline border-r-sky-400 border-t-red-400 border-b-green-400 border-l-yellow-400">
                            <span className="text-red-600">G</span>
                            <span className="text-yellow-500">o</span>
                            <span className="text-blue-500">o</span>
                            <span className="text-red-600">g</span>
                            <span className="text-green-500">l</span>
                            <span className="text-yellow-500">e</span></button></div>
                        <div ><button onClick={handleGithubSignIn} className="btn w-full btn-outline border-b-purple-500 border-t-green-500 border-l-gray-700 border-r-white
">
                            <span className="text-gray-500">G</span>
                            <span className="text-green-500">i</span>
                            <span className="text-yellow-500">t</span>
                            <span className="text-purple-500">H</span>
                            <span className="text-yellow-500">u</span>
                            <span className="text-blue-500">b</span>

                        </button></div>
                    </div>

                    <p className="mt-8 text-xs font-light text-center font-medium text-gray-800"> Don't have an account? <Link to='/sign-up'><p className="font-medium text-gray-700  hover:underline">Create One</p></Link></p>
                </div>
            </div>
        </>
    );
};

export default SignIn;
