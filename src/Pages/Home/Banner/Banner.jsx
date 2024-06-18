import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img0 from '../../../assets/Photos/banner0.jpg'


const Banner = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${img0})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className=" lg:mb-5 text-4xl lg:text-5xl font-bold leading-loose text-white">WELCOME <br /> to <br />th<span className="text-red-600">i</span>nkSync</h1>
                </div>
            </div>
        </div>
    );
};

export default Banner;