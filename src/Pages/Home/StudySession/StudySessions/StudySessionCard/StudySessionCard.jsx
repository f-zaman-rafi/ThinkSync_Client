/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const StudySessionCard = ({ session }) => {
    const { title, description, _id, Registration_End } = session;

    const [status, setStatus] = useState("ongoing");

    useEffect(() => {
        const now = new Date();
        const registrationEnd = new Date(Registration_End);

        const registrationEndLocal = new Date(registrationEnd.getFullYear(), registrationEnd.getMonth(), registrationEnd.getDate());

        if (now > registrationEndLocal) {
            setStatus("closed");
        } else {
            setStatus("ongoing");
        }
    }, [Registration_End]);

    return (
        <div className="card w-96 bg-transparent shadow-xl h-full flex flex-col">
            <div className="card-body flex flex-col justify-between">
                <h2 className="card-title py-5 font-bold text-xl">{title}</h2>
                <p className="leading-loose flex-grow mb-10">{description}</p>
                <div className="card-actions flex justify-between gap-14 items-center mt-auto">
                    <p className={`font-semibold ${status === "closed" ? " border-[1px] py-[5px] rounded-full text-red-600 text-center" : "border-[1px] py-[5px] rounded-full text-black text-center"}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </p>
                    <Link to={`/sessions/${_id}`}>
                        <button className="btn btn-outline border-2 border-stone-800 hover:bg-stone-800 hover:text-white font-semibold text-black">Read More</button>
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default StudySessionCard;
