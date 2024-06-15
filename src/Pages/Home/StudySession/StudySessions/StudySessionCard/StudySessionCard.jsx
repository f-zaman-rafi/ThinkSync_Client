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
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title py-5">{title}</h2>
                    <p className="leading-loose">{description}</p>
                    <div className="card-actions flex justify-between mt-10">
                        <button className={`btn ${status === "closed" ? "btn-secondary" : "btn-primary"}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                        <Link to={`/sessions/${_id}`}>
                            <button className="btn btn-primary">Read More</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudySessionCard;
