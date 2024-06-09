import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

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
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        </ul>
                    </div>
                    <Link to={'/'}><p className="btn btn-ghost text-xl">thinkSync</p></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <div className="flex gap-4 justify-center items-center">
                            <Link to="/dashboard"><p className="btn btn-xs btn-ghost">Dashboard</p></Link>
                            <button onClick={handleLogOut} className="btn btn-ghost btn-xs">Sign Out</button>
                            <p ><img className="h-8 w-8 rounded-full" src={user.photoURL} alt="" /></p>
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