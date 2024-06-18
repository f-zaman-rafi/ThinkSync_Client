import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { SiStudyverse } from "react-icons/si";


const Navbar = () => {


    const { user, logOut } = useAuth()

    // console.log(user)
    const handleLogOut = () => {
        logOut()
            .then(() => { toast.success('Logged Out Successfully') })
            .catch(error => console.log(error));
    }


    return (
        <div>
            <div className="navbar fixed z-10 max-w-screen-2xl mx-auto bg-opacity-50 bg-base-100">
                <div className="navbar-start">

                    <Link to={'/'}><p className="btn btn-ghost text-sm lg:text-2xl "><SiStudyverse /> thinkSync</p></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <div className="flex lg:gap-4 justify-center items-center">
                            <Link to="/dashboard"><p className="btn btn-xs btn-ghost">Dashboard</p></Link>
                            <button onClick={handleLogOut} className="btn btn-ghost btn-xs">Sign Out</button>
                            <p ><img className="lg:h-8 lg:w-8 h-6 w-6 rounded-full" src={user.photoURL} alt="" /></p>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <Link to='/sign-in' className="btn">Sign In</Link>
                            <Link to='/sign-up' className="btn">Sign Up</Link>
                        </div>
                    )}
                </div>

            </div >
        </div >
    );
};

export default Navbar;