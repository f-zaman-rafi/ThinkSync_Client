import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
// import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
// import { useEffect, useState } from "react";

const Navbar = () => {


    const { user, logOut } = useAuth()

    const handleLogOut = () => {
        logOut()
            .then(() => { toast.success('Logged Out Successfully') })
            .catch(error => console.log(error));
    }

    // // -----------Theme--------------

    // const [theme, setTheme] = useState('light');
    // const toggleTheme = () => {
    //     setTheme(theme === 'light' ? 'night' : 'light');
    // };
    // useEffect(() => {
    //     document.querySelector('html').setAttribute('data-theme', theme);
    // }, [theme]);


    return (
        <div className="">
            <div className="navbar max-w-screen-2xl mx-auto lg:px-10 lg:pt-5 bg-transparent">
                <div className="navbar-start">

                    <Link to={'/'}>
                        <p className="flex lg:gap-2 items-end text-stone-700   text-xl font-bold lg:text-3xl font-stardos">
                            <svg className="lg:h-12 h-10 w-8 lg:w-12 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="#964B00" strokeLinecap="round" strokeWidth="2" d="M8.737 8.737a21.49 21.49 0 0 1 3.308-2.724m0 0c3.063-2.026 5.99-2.641 7.331-1.3 1.827 1.828.026 6.591-4.023 10.64-4.049 4.049-8.812 5.85-10.64 4.023-1.33-1.33-.736-4.218 1.249-7.253m6.083-6.11c-3.063-2.026-5.99-2.641-7.331-1.3-1.827 1.828-.026 6.591 4.023 10.64m3.308-9.34a21.497 21.497 0 0 1 3.308 2.724m2.775 3.386c1.985 3.035 2.579 5.923 1.248 7.253-1.336 1.337-4.245.732-7.295-1.275M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                            </svg>
                            thinkSync
                        </p>
                    </Link>
                </div>

                <div className="navbar-end">
                    {user ? (
                        <div className="flex lg:gap-2 gap-1 lg:justify-center items-center ">
                            <Link to="/dashboard"><p className="btn btn-sm btn-outline border-2 hover:text-white hover:bg-stone-800 border-stone-800 text-shadow-outline">Dashboard</p></Link>
                            <button onClick={handleLogOut} className="btn btn-sm btn-outline border-2 hover:text-white hover:bg-stone-800 border-stone-800 text-shadow-outline">Sign Out</button>
                            <p className="tooltip tooltip-bottom hidden lg:block" data-tip={user.displayName}><img className="lg:h-8 lg:w-8 h-6 w-6 rounded-full border-2 border-stone-800" src={user.photoURL} alt="userPhoto" /></p>
                        </div>
                    ) : (
                        <div className="flex lg:gap-2 gap-1 lg:justify-center items-center">
                            <Link to='/sign-in' className="btn btn-sm btn-outline border-2 hover:text-white hover:bg-stone-800 border-stone-800 text-shadow-outline">Sign In</Link>
                            <Link to='/sign-up' className="btn btn-sm btn-outline border-2 hover:text-white hover:bg-stone-800 border-stone-800 text-shadow-outline">Sign Up</Link>
                        </div>
                    )}
                    {/* <div>
                        <label className="swap swap-rotate">
                            <input onClick={toggleTheme} type="checkbox" />

                            <MdOutlineLightMode className="swap-on fill-current h-7 w-7 md:h-10 md:w-10  text-stone-500  "></MdOutlineLightMode>


                            <MdOutlineDarkMode className="swap-off fill-current h-7 w-7 md:h-10 md:w-10  text-[#FFD700] "></MdOutlineDarkMode >
                        </label>
                    </div> */}
                </div>

            </div >
        </div >
    );
};

export default Navbar;