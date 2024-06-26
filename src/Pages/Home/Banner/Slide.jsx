/* eslint-disable react/prop-types */


const Slide = ({ image }) => {


    return (
        <header>
            <div className="hero min-h-screen relative" style={{ backgroundImage: `url(${image})` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/10"></div>
                <div className="hero-overlay bg-opacity-60"></div>
            </div>

        </header >
    );
};

export default Slide;
