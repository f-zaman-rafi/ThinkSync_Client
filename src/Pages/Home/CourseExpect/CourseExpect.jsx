/* eslint-disable react/no-unescaped-entities */
import image from "../../../assets/Photos/learning.jpg"
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { GiSatelliteCommunication } from "react-icons/gi";
import { GiConversation } from "react-icons/gi";
import { PiCertificateThin } from "react-icons/pi";
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";



const CourseExpect = () => {
    return (
        <div className="flex lg:flex-row flex-col py-20">
            <div className="  flex justify-items-center">
                <div className="lg:ml-16 ml-5">
                    <h1 className="lg:text-5xl text-3xl lg:w-3/4 font-bold py-10 ">What to Expect from a thinkSync Course</h1>
                    <p className="lg:w-4/5 pb-8 lg:px-0 px-5 font-medium">Joining a thinkSync course ensures a successful learning experience. Our courses provide practical skills alongside theoretical knowledge. Benefit from expert instructors, hands-on projects, and a supportive environment that fosters growth.</p>
                    <p className="px-5"><img className="lg:h-96 h-[200px] rounded-2xl" src={image} alt="learning" /></p>
                </div>
            </div>
            <div className="flex flex-col justify-end">


                <div className="flex flex-col lg:flex-row justify-between ">
                    <div className=" w-full h-full">
                        <MouseParallaxContainer globalFactorX={-0.1} globalFactorY={-0.1} resetOnLeave={true}>
                            <MouseParallaxChild factorX={1.1} factorY={1.1} >

                                <div className="p-5 ">
                                    <div className="p-10  hover:bg-purple-200  rounded-xl shadow-md">
                                        <p className="">
                                            <HiOutlineAcademicCap className="h-14 w-14 border-2 px-2 py-2 rounded-full  bg-white border-stone-800" />
                                        </p>
                                        <p className="text-2xl font-bold py-3">Knowledge</p>
                                        <p>Gain practical skills, in-depth knowledge, and expert guidance to achieve your goals with thinkSync.</p>
                                    </div>
                                </div>

                            </MouseParallaxChild>
                        </MouseParallaxContainer>
                    </div>

                    <div className=" w-full h-full">
                        <MouseParallaxContainer globalFactorX={-0.1} globalFactorY={-0.1} resetOnLeave={true}>
                            <MouseParallaxChild factorX={1.1} factorY={1.1}>
                                <div className="p-5 ">
                                    <div className="p-10 hover:bg-purple-200 rounded-xl shadow-md">
                                        <p className="">
                                            <GiSatelliteCommunication className="h-14 w-14 border-2 px-2 py-2 rounded-full  bg-white border-stone-800" />
                                        </p>
                                        <p className="text-2xl font-bold py-3">Unlimited Access</p>
                                        <p>Enjoy unlimited access to resources, courses, and expert support to advance your skills and achieve your aspirations.</p>
                                    </div>
                                </div>
                            </MouseParallaxChild>
                        </MouseParallaxContainer>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between">

                    <div className=" w-full h-full">
                        <MouseParallaxContainer globalFactorX={-0.1} globalFactorY={-0.1} resetOnLeave={true}>
                            <MouseParallaxChild factorX={1.1} factorY={1.1}>
                                <div className="p-5">
                                    <div className="p-10  hover:bg-purple-200  rounded-xl shadow-md">
                                        <p className="">
                                            <GiConversation className="h-14 w-14 border-2 px-2 py-2 rounded-full  bg-white border-stone-800" />
                                        </p>
                                        <p className="text-2xl font-bold py-3">Practical Skills</p>
                                        <p>Develop hands-on skills with real-world applications through thinkSync’s expert-led courses and projects.</p>
                                    </div>
                                </div>
                            </MouseParallaxChild>
                        </MouseParallaxContainer>
                    </div>

                    <div className=" w-full h-full">
                        <MouseParallaxContainer globalFactorX={-0.1} globalFactorY={-0.1} resetOnLeave={true}>
                            <MouseParallaxChild factorX={1.1} factorY={1.1}>

                                <div className="p-5">
                                    <div className="p-10  hover:bg-purple-200  rounded-xl shadow-md">
                                        <p className="">
                                            <PiCertificateThin className="h-14 w-14 border-2 px-2 py-2 rounded-full  bg-white border-stone-800" />
                                        </p>
                                        <p className="text-2xl font-bold py-3">A Certificate</p>
                                        <p>Earn a certificate that reflects your expertise and dedication to learning with thinkSync’s high-quality courses.</p>
                                    </div>
                                </div>

                            </MouseParallaxChild>
                        </MouseParallaxContainer>
                    </div >
                </div >

            </div >
        </div >
    );
};

export default CourseExpect;