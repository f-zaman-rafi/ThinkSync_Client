import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get('/users');
                return data;
            } catch (error) {
                console.error('Error fetching all users:', error);
                return [];
            }
        }
    });

    useEffect(() => {
        if (users.length > 0) {
            const result = users.filter(user =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(result);
        }
    }, [searchQuery, users]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // make a user as an admin
    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "The user is now an Admin",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    // make a user as a tutor
    const handleMakeTutor = user => {
        axiosSecure.patch(`/users/tutor/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "The user is now a Tutor",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    // make user as a student
    const handleMakeStudent = user => {
        axiosSecure.patch(`/users/student/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "The user is now a Student",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    // delete a user
    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="my-12">
            <Helmet>
                <title>All-Users | ThinkSync</title>
            </Helmet>
            <section className="container px-4 mx-auto">
                <div className="flex items-center gap-x-3 pb-5">
                    <h2 className="text-lg font-medium text-stone-700">Total Users</h2>
                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400 ">{users.length} users</span>
                </div>

                <div className="flex items-center gap-x-3 mb-4">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>

                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                {filteredUsers.length > 0 ? (
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead className="  bg-stone-800">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-200">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Name</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-200">
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Role</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                                        </svg>
                                                    </button>
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-200">Email address</th>
                                                <th scope="col" className="relative py-3.5 px-4">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>

                                        {filteredUsers.map(user => (
                                            <tbody key={user._id} className="bg-stone-800 divide-y divide-stone-700">
                                                <tr>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <div className="flex items-center gap-x-2">
                                                                <div>
                                                                    <h2 className="font-medium text-gray-300 ">{user.name}</h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{user.role}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{user.email}</td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div className="flex items-center gap-x-6">
                                                            {/* Edit Button */}
                                                            <div className="flex justify-center">
                                                                <button onClick={() => { document.getElementById('my_modal_1').showModal(); window.currentUser = user; }} className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                    </svg>
                                                                </button>

                                                                <dialog id="my_modal_1" className="modal">
                                                                    <div className="modal-box">
                                                                        <h3 className="font-bold text-lg">Select User Role!</h3>
                                                                        <div className="mt-4">

                                                                            <select
                                                                                id="role"
                                                                                className="select w-full px-4 py-2 mt-2 text-gray-700  border rounded-lg  bg-stone-200 dark:text-stone-900 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                                            >
                                                                                <option value="" selected disabled>Pick a Role</option>
                                                                                <option value="Admin">Admin</option>
                                                                                <option value="Tutor">Tutor</option>
                                                                                <option value="Student">Student</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="modal-action">
                                                                            <form
                                                                                onSubmit={(e) => {
                                                                                    e.preventDefault();
                                                                                    const value = document.getElementById('role').value;
                                                                                    if (value === 'Admin') {
                                                                                        handleMakeAdmin(window.currentUser);
                                                                                    }
                                                                                    if (value === 'Tutor') {
                                                                                        handleMakeTutor(window.currentUser)
                                                                                    }
                                                                                    if (value === 'Student') {
                                                                                        handleMakeStudent(window.currentUser)
                                                                                    }
                                                                                    document.getElementById('my_modal_1').close();
                                                                                }}
                                                                            >
                                                                                <button type="submit" className="btn">Select</button>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </dialog>
                                                            </div>

                                                            {/* Delete Button */}
                                                            <button onClick={() => handleDeleteUser(user)} className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                ) : (
                                    <div className="p-5 text-center text-gray-500 dark:text-gray-300">
                                        No users found matching your search.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AllUsers;
