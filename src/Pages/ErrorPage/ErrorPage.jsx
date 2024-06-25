import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <Helmet>
                <title>Oops! | studySync</title>
            </Helmet>
            <div className="relative">
                <p className=" text-3xl max-w-2xl mx-auto font-press text-center leading-loose pt-20 text-violet-500">Oops! <br /> You have landed a wrong place!</p>
                <Link to='/'><p className="text-center mt-32 btn flex justify-center max-w-xs  btn-ghost border-2 border-violet-500 hover:bg-transparent hover:border-red-600 mx-auto">--  Go Back Home --</p></Link>
            </div>
        </div>
    );
};

export default ErrorPage;