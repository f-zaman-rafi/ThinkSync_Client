/* eslint-disable react/no-unescaped-entities */
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const ContactUs = () => {
    const { user } = useAuth();

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        await Swal.fire({
            position: "center",
            icon: "success",
            title: "Thank you for your message. We will get back to you soon!",
            showConfirmButton: false,
            timer: 1000
        });

    }




    return (
        <div>
            <section className=" " id="contact">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="mb-4">
                        <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                            <p className="font-bold text-4xl lg:text-5xl pt-8 text-center font-philosopher text-[#ff0000]">Get in Touch</p>
                            <p className="mx-auto mt-4 max-w-3xl  text-gray-600 dark:text-slate-400">We would love to hear from you!</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2">
                        <div className="h-full pr-6 pt-8">
                            <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">
                                We're here to support your learning journey at ThinkSync. Whether you have questions, need guidance, or just want to share your thoughts, we're excited to hear from you. Let's connect and make learning a seamless experience together.
                            </p>


                            <ul className="mb-6 space-y-5 md:mb-0">
                                <li className="flex">
                                    <div className="flex h-10 w-10 items-center justify-center text-gray-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-4 mb-4">
                                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Our Address</h3>
                                        <p className="text-gray-600 dark:text-slate-400">47150, SS15 Jalan Mountain View</p>
                                        <p className="text-gray-600 dark:text-slate-400">Damansara, Selangor</p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <div className="flex h-10 w-10 items-center justify-center  text-gray-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                                            <path d="M15 7a2 2 0 0 1 2 2"></path>
                                            <path d="M15 3a6 6 0 0 1 6 6"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-4 mb-4">
                                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Contact</h3>
                                        <p className="text-gray-600 dark:text-slate-400">Mobile: +6 (123) 456-7890</p>
                                        <p className="text-gray-600 dark:text-slate-400">Mail: thinkSync@dejaVu.com</p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <div className="flex h-10 w-10 items-center justify-center  text-gray-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                            <path d="M12 7v5l3 3"></path>
                                        </svg>
                                    </div>
                                    <div className="ml-4 mb-4">
                                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">Working hours</h3>
                                        <p className="text-gray-600 dark:text-slate-400">Monday - Friday: 08:00 - 17:00</p>
                                        <p className="text-gray-600 dark:text-slate-400">Saturday & Sunday: 08:00 - 12:00</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <form onSubmit={handleOnSubmit} className="card h-fit max-w-6xl px-5 md:p-12 space-y-4" id="form">
                            <h2 className="mb-4 text-2xl font-bold dark:text-white">Ready to Get Started?</h2>
                            <div id="contactForm">
                                <div className="mb-6 space-y-6">
                                    <div className="mx-0 mb-1 sm:mb-4 space-y-6">
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label htmlFor="name" className="pb-1 text-xs uppercase tracking-wider"></label>
                                            <input type="text" id="name" autoComplete="given-name" placeholder={user ? user.displayName : "Your name"} className="mb-2 w-full rounded-md border border-[#FFFF00] focus:border-[#ff0000] focus:border-2 focus:outline bg-transparent py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0" name="name" disabled={user ? true : false} />
                                        </div>
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label htmlFor="email" className="pb-1 text-xs uppercase tracking-wider"></label>
                                            <input type="email" id="email" autoComplete="email" placeholder={user ? user.email : "Your email address"} className="mb-2 w-full rounded-md border border-[#FFFF00] focus:border-[#ff0000] focus:border-2 focus:outline bg-transparent py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0" name="email" disabled={user ? true : false} />
                                        </div>
                                    </div>
                                    <div className="mx-0 mb-1 sm:mb-4">
                                        <label htmlFor="textarea" className="pb-1 text-xs uppercase tracking-wider"></label>
                                        <textarea id="textarea" name="textarea" cols="30" rows="5" placeholder="Write your message..." className="mb-2 w-full rounded-md border border-[#FFFF00] focus:border-[#ff0000] focus:border-2 focus:outline bg-transparent py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0" required></textarea>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="w-full bg-[#FFFF00] text-black font-semibold px-6 py-3 font-xl rounded-md sm:mb-0 hover:bg-[#ff0000] transition duration-[800ms]">Send Message</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div >
            </section >
        </div >
    );
};

export default ContactUs;