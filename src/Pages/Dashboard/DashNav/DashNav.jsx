import { useState } from "react";
import { Link } from "react-router-dom";
import useRole from "../../../Hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";


const DashNav = () => {


    const [isOpen, setIsOpen] = useState(false);

    const { role, isLoading } = useRole();

    if (isLoading) {
        return <LoadingSpinner />
    }



    const navLink = <>
        {
            role === 'Student' ?
                <>
                    <Link to='booked-session'><p href="#" className="px-2.5 py-2 transition-colors duration-300 transform rounded-lg text-stone-700 hover:bg-stone-200  md:mx-2">View Booked Session</p>
                    </Link>
                    <Link to='create-note'><p href="#" className="px-2.5 py-2 transition-colors duration-300 transform rounded-lg text-stone-700 hover:bg-stone-200  md:mx-2">Create Note</p></Link>
                    <Link to='personal-note'><p href="#" className="px-2.5 py-2 transition-colors duration-300 transform rounded-lg text-stone-700 hover:bg-stone-200  md:mx-2">Manage Personal notes</p></Link>
                    <Link to='study-materials'><p href="#" className="px-2.5 py-2 transition-colors duration-300 transform rounded-lg text-stone-700 hover:bg-stone-200  md:mx-2">View all study materials</p></Link>

                </>
                :
                ''
        }
        {/* Tutor Section */}

        {
            role === 'Tutor' ?
                <>
                    <Link to='create-session'><p href="#" className="px-2.5 py-2 transition-colors duration-300 transform rounded-lg text-stone-700 hover:bg-stone-200  md:mx-2">Create Study Session</p>
                    </Link>
                    <Link to='sessions-by-tutor'><p href="#" className="px-2.5 py-2 transition-colors duration-300 transform rounded-lg text-stone-700 hover:bg-stone-200  md:mx-2">View all study sessions</p></Link>
                    <Link to='upload-materials'><p href="#" className="px-2.5 py-2 transition-colors duration-300 transform rounded-lg text-stone-700 hover:bg-stone-200  md:mx-2">Upload Materials</p></Link>
                    <Link to='material'><p href="#" className="px-2.5 py-2 transition-colors duration-300 transform rounded-lg text-stone-700 hover:bg-stone-200  md:mx-2">View all materials</p></Link>

                </>
                :
                ''
        }
        {/* Admin Section */}

        {
            role === 'Admin' ?
                <>
                    <Link to='all-users'><p href="#" className="px-2.5 py-2 transition-colors duration-300 transform rounded-lg text-stone-700 hover:bg-stone-200  md:mx-2">View all users</p></Link>
                    <Link to='all-sessions-dash'><p href="#" className="px-2.5 py-2 transition-colors duration-300 transform rounded-lg text-stone-700 hover:bg-stone-200  md:mx-2">View all study sessions</p></Link>
                    <Link to='all-materials-admin'><p href="#" className="px-2.5 py-2 transition-colors duration-300 transform rounded-lg text-stone-700 hover:bg-stone-200  md:mx-2">View all materials</p>
                    </Link>
                </>
                :
                ''
        }
    </>

    return (
        <nav className="relative">
            <div className="container px-6 py-3 mx-auto md:flex">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <p className="text-3xl font-bold text-stone-900">Dashboard <div className="flex justify-between my-4 items-center text-center"><Link to='/'><span className="text-xs rounded-full border-blue-300 border-2 px-4 py-1 font-medium text-stone-700">Home</span></Link><span className="text-xs font-medium rounded-full border-red-600 border-2 px-4 py-1 text-stone-700">{role}</span></div></p>

                    {/* Mobile menu button */}
                    <div className="flex lg:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-500 dark:text-stone-700 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                            <svg className={`w-6 h-6 ${isOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                            </svg>
                            <svg className={`w-6 h-6 ${isOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu open: "block", Menu closed: "hidden" */}

                <div className={`${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'} absolute inset-x-0 z-20 lg:w-full lg:rounded-none rounded-r-2xl w-3/5 px-6 py-4 lg:bg-none bg-neutral-800 lg:bg-opacity-0 bg-opacity-90 transition-all duration-1000 ease-in-out  md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between`}>
                    <div className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
                        {navLink}
                    </div>
                </div>
            </div >
        </nav >
    );
};

export default DashNav;
