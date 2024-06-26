import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import img0 from '../../../assets/Photos/banner0.jpg'
import img1 from '../../../assets/Photos/banner1.jpg'
import img2 from '../../../assets/Photos/banner2.jpg'
import img3 from '../../../assets/Photos/banner3.jpg'
import img4 from '../../../assets/Photos/banner4.jpg'




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
        </>
    );
}
