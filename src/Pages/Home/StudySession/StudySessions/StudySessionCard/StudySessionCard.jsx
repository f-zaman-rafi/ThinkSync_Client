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
        <div className="card w-96 bg-base-100 shadow-xl h-full flex flex-col">
            <div className="card-body flex flex-col justify-between">
                <h2 className="card-title py-5 text-white font-bold text-xl">{title}</h2>
                <p className="leading-loose flex-grow mb-10">{description}</p>
                <div className="card-actions flex justify-between gap-14 items-center mt-auto">
                    <p className={`font-semibold ${status === "closed" ? "bg-[#585858fd] py-[10.8px] px-5 rounded-lg text-black text-center" : "bg-[#8bfff5] py-[10.8px] px-5 rounded-lg text-black text-center"}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </p>
                    <Link to={`/sessions/${_id}`}>
                        <button className="btn bg-[#FFFF00] hover:bg-red-600 font-semibold text-black">Read More</button>
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default StudySessionCard;
