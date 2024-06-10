
const ModalTest = () => {


    return (
        <div className="flex justify-center my-20">

            <button onClick={() => document.getElementById('my_modal_1').showModal()} className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </button>


            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Select User Role!</h3>

                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <label name="role" className="block text-sm text-gray-800 dark:text-gray-200">Select your user here</label>
                        </div>

                        <select
                            id="role"
                            className="select w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        >
                            <option value="" selected disabled>Pick a Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Tutor">Tutor</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={() => {
                                const value = document.getElementById('role').value;
                                if (value === 'Admin') {
                                    handleMakeAdmin(user)
                                }
                            }}
                                className="btn">Done</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ModalTest;
