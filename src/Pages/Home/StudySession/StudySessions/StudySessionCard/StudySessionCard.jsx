/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const StudySessionCard = ({ session }) => {
    const { title, description, _id } = session
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title py-5">{title}</h2>
                    <p className="leading-loose ">{description}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/sessions/${_id}`}><button className="btn btn-primary">Read More</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudySessionCard;