/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Typewriter from 'typewriter-effect';
import { useEffect, useState } from 'react';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const testimonials = [
    {
        text: "ThinkSync has transformed the way I learn. It's like having a conversation with my wittiest friend!",
        author: "John Dave",
        role: "Student",
        imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        text: "The best learning platform I've ever used. Curiosity really sparks and knowledge truly syncs!",
        author: "Jane Hamburger",
        role: "Educator",
        imgSrc: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?crop=faces&fit=crop&w=256&h=256&q=80",
    },
    {
        text: "With ThinkSync, learning new things has never been easier or more enjoyable. Highly recommend!",
        author: "Michael Johnson",
        role: "Professional",
        imgSrc: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    },
    {
        text: "A game-changer in education. ThinkSync provides a seamless and engaging learning experience.",
        author: "Jack Cooper",
        role: "Teacher",
        imgSrc: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?crop=faces&fit=crop&w=256&h=256&q=80",
    },
    {
        text: "ThinkSync helps me stay curious and constantly learn new things. It's an invaluable resource!",
        author: "Sarah Lee",
        role: "Lifelong Learner",
        imgSrc: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?crop=faces&fit=crop&w=256&h=256&q=80",
    }
];

const Slide = ({ text, author, role, imgSrc }) => {
    const [startTyping, setStartTyping] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setStartTyping(true);
        }, 2200);

        return () => clearTimeout(timeout);
    }, []);
    return (
        <section className="relative isolate overflow-hidden bg-[#FFFF00] px-6 py-24 sm:py-32 lg:px-8 ">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-red-600 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
            <div className="mx-auto max-w-2xl lg:max-w-4xl lg:min-h-max min-h-[50vh]">
                <h1 className='font-protest-revolution text-5xl text-center pb-8'><span className='text-[#FFFF00]'>Testim</span><span className='lg:text-[#ff0000] md:text-green-500 text-green-500'>onials</span></h1>
                <figure className="mt-10">
                    <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                        {startTyping && (
                            <Typewriter
                                options={{
                                    strings: [`${text}`],
                                    autoStart: true,
                                    loop: true,
                                    cursor: '|',
                                    delay: 50,
                                    deleteSpeed: 0,
                                    pauseFor: 50000,
                                    html: true,
                                }}
                            />
                        )}
                    </blockquote>
                    <figcaption className="mt-10">
                        <img className="mx-auto h-10 w-10 rounded-full" src={imgSrc} alt={author} />
                        <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                            <div className="font-semibold text-gray-900">{author}</div>
                            <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900">
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <div className="text-gray-600">{role}</div>
                        </div>
                    </figcaption>
                </figure>
            </div>
        </section>
    );
};

export default function Carousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                loop={true}
                speed={2000}
                autoplay={{
                    delay: 12000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={false}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <Slide {...testimonial} key={activeIndex} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
