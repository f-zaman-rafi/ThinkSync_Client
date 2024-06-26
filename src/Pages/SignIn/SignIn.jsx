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

    const onSubmit = async data => {
        try {
            const result = await signIn(data.email, data.password);
            const loggedUser = result.user;
            localStorage.setItem('token', loggedUser.stsTokenManager.accessToken);
            const from = location.state?.from?.pathname || '/';
            navigate(from);
            toast.success('Sign-In Successfully');
            console.log(loggedUser);
        } catch (error) {
            console.error(error);
            toast.error('Sign-In Failed');
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
                <div className="w-full max-w-sm p-6 m-auto mx-auto  rounded-lg shadow-md bg-stone-700 bg-opacity-20">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-32 sm:h-8" src="/public/sync.svg" alt="Logo" />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                        <div className="mt-4">
                            <label name="email" className="block text-sm text-gray-800 dark:text-white">Email</label>
                            <input
                                type="text"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email address"
                                    }
                                })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-transparent dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.email && <span className="text-red-500 ml-1 text-xs">{errors.email.message}</span>}
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center justify-between">
                                <label name="password" className="block text-sm text-gray-800 dark:text-white">Password</label>
                                <p className="text-xs text-gray-600 dark:text-gray-400 hover:underline">Forget Password?</p>
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
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-transparent dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            {errors.password && <span className="text-red-500 ml-1 text-xs">{errors.password.message}</span>}
                        </div>

                        <div className="mt-6">
                            <input className="btn w-full border-stone-600 btn-outline" type="submit" value="Sign In" />
                        </div>
                    </form>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
                        <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                            or login with Social Media
                        </p>
                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                    </div>

                    <div className="mt-5 space-y-2">
                        <div ><button onClick={handleGoogleSignIn} className="btn  w-full btn-outline border-r-sky-400 border-t-red-400 border-b-green-400 border-l-yellow-400">Continue with
                            <span className="text-red-500">G</span>
                            <span className="text-yellow-500">o</span>
                            <span className="text-blue-500">o</span>
                            <span className="text-red-500">g</span>
                            <span className="text-green-500">l</span>
                            <span className="text-yellow-500">e</span></button></div>
                        <div ><button onClick={handleGithubSignIn} className="btn w-full btn-outline border-b-purple-500 border-t-green-500 border-l-gray-700 border-r-white
">Continue with
                            <span className="text-gray-500">G</span>
                            <span className="text-green-500">i</span>
                            <span className="text-yellow-500">t</span>
                            <span className="text-purple-500">H</span>
                            <span className="text-yellow-500">u</span>
                            <span className="text-blue-500">b</span>

                        </button></div>
                    </div>

                    <p className="mt-8 text-xs font-light text-center text-gray-400"> Don't have an account? <Link to='/sign-up'><p className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Create One</p></Link></p>
                </div>
            </div>
        </>
    );
};

export default SignIn;
