import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img0 from '../../../assets/Photos/banner1.jpg'
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css'


const Banner = () => {
    useEffect(() => {
        Aos.init({ duration: 3000 });
    }, []);

    return (
        <div className="hero min-h-screen relative" style={{ backgroundImage: `url(${img0})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/40"></div>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="">
                    <h1 data-aos="fade-left" className=" lg:mb-5 text-4xl lg:text-5xl font-bold leading-loose text-[#ff2424]">Sync Your Mind</h1>
                    <h1 className=" lg:mb-5 text-4xl lg:text-5xl font-extrabold leading-loose text-[#8bfff5]">Harness Your Thoughts</h1>
                    <h1 data-aos="fade-right" className=" lg:mb-5 text-4xl lg:text-6xl font-bold leading-loose text-[#ffe925]">Empower Your Learning!</h1>
                </div>
            </div>
        </div>
    );
};

export default Banner;