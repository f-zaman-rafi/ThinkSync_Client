import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import img0 from '../../../assets/Photos/banner0.jpg'
import img1 from '../../../assets/Photos/banner1.jpg'
import img2 from '../../../assets/Photos/banner2.jpg'
import img3 from '../../../assets/Photos/banner3.jpg'
import img4 from '../../../assets/Photos/banner4.jpg'
import Typewriter from 'typewriter-effect';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';

export default function Carousel() {
    return (
        <>
            <Swiper
                spaceBetween={1}
                centeredSlides={true}
                loop={true}
                speed={2000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide><Slide image={img0} text={'Unleash Your Creative Potential'} textColor="text-yellow-400"></Slide></SwiperSlide>
                <SwiperSlide><Slide image={img1} text={'Embrace Innovation Every Day'} textColor="text-green-500"></Slide></SwiperSlide>
                <SwiperSlide><Slide image={img2} text={'Ignite Your Passion for Learning'} textColor="text-blue-500"></Slide></SwiperSlide>
                <SwiperSlide><Slide image={img3} text={'Achieve Greatness Through Knowledge'} textColor="text-purple-400"></Slide></SwiperSlide>
                <SwiperSlide><Slide image={img4} text={'Transform Ideas into Actions'} textColor="text-red-600"></Slide></SwiperSlide>



            </Swiper>
            <div className="absolute z-10 text-[42px] top-[45%] left-[7%] leading-loose font-protest-revolution">
                <Typewriter
                    options={{
                        strings: [
                            '<span style="color: #FF0000;">Welcome to ThinkSync!</span> <br/> <span style="color: #4169E1;">where curiosity sparks, knowledge syncs,</span>  <br/> <span style="color: #FFFF00;">and learning feels like a conversation with your wittiest friend!</span>'
                        ],
                        autoStart: true,
                        loop: true,
                        cursor: '|',
                        delay: 90,
                        deleteSpeed: 50,
                        pauseFor: 600000,
                        html: true,
                    }}
                />
            </div>
        </>
    );
}
