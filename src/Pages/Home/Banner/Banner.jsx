import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img0 from '../../../assets/Photos/banner0.jpg'


const Banner = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${img0})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold leading-loose">WELCOME <br /> to <br />thinkSync</h1>
                </div>
            </div>
        </div>
    );
};

export default Banner;