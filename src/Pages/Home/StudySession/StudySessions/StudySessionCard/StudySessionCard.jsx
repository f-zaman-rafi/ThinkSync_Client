/* eslint-disable react/prop-types */

const StudySessionCard = ({ session }) => {
    const { sessionTitle, sessionDescription } = session
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title py-5">{sessionTitle}</h2>
                    <p className="leading-loose ">{sessionDescription}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Read More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudySessionCard;