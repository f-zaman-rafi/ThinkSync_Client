import bannerIMG from "../../../assets/Photos/Banner-Photo.png"
import Typewriter from 'typewriter-effect';
import { Link } from 'react-scroll';


const NewBanner = () => {
    return (
        <div className="pb-20">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 justify-end lg:py-16">
                <div className=" pt-6 lg:pt-36 lg:space-y-5 lg:w-2/5">
                    {/* <p className="font-bold text-xl pl-3 py-2">Learning Experience</p> */}
                    <p className="lg:text-[55px] text-4xl pt-5 lg:pt-0 font-extrabold leading-snug font-protest-revolution text-red-600">
                        <span className="text-blue-600 pl-3">The Best</span> <span className="text-green-500"> Online</span><br /> <span className=" text-3xl lg:text-[55px] pl-8 lg:pl-10">Courses of</span > <span className=" text-3xl lg:text-[55px] text-[#ff32f5]">All Time</span>
                    </p>
                    <div className="flex gap-2 items-center text-[22px] lg:text-[27px] font-bold font-protest-revolution lg:pl-24 pl-16 pt-3 lg:pt-0">
                        <div className="text-sky-400">
                            Discover
                        </div>
                        <div className="text-sky-400">
                            <Typewriter className="text-xl"
                                options={{
                                    strings: [
                                        '<span style="color: rgb(255, 204, 0)">Something new every day</span>',
                                        '<span style="color: rgb(0,120,255)">Technology trends</span>',
                                        '<span style="color: rgb(189,0,255)">Programming skills</span>',
                                        '<span style="color: rgb(1,255,31)">Mastering new skills</span>',
                                        '<span style="color: rgb((74,10,138)">Creative design</span>',
                                        '<span style="color: rgb(255,65,98)">Data science secrets</span>',
                                        '<span style="color: rgb(35,11,102)">Science and society</span>',
                                        '<span style="color: rgb(103,4,69)">Entrepreneurship</span>',
                                    ],

                                    autoStart: true,
                                    loop: true,
                                    cursor: '|',
                                    delay: 100,
                                    deleteSpeed: 50,
                                    pauseFor: 1500,
                                    html: true,
                                }}
                            />

                        </div>
                    </div>

                </div>
                <div className=" h-full">
                    <img className="lg:h-[550px] w-full" src={bannerIMG} alt="" />
                </div>

            </div>
            <div className="pt-10 flex justify-center">
                <Link to="exploreCourses" smooth={true} duration={1500} ><p className="btn btn-outline btn-wide text-2xl font-protest-revolution text-[#ff2c2c] ">Explore Courses</p></Link>
            </div>

        </div>

    );
};

export default NewBanner;