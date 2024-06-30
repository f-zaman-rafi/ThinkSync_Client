import { useState } from 'react';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

const Counts = () => {
    const [count, setCount] = useState(false)
    return (
        <div className='flex flex-col lg:flex-row px-16 gap-10 bg-violet-100 py-16 mt-32'>
            <div className='text-stone-800 space-y-5 border-b-2 border-gray-300 py-5'>
                <ScrollTrigger onEnter={() => setCount(true)} onExit={() => setCount(false)} throttleResize={2000} >
                    <h1 className='text-6xl font-extrabold'> {count &&
                        <CountUp start={0} end={600}></CountUp>
                    }+
                    </h1>
                </ScrollTrigger>
                <p className='lg:w-4/5'>Hours of hands-on learning in our courses</p>
            </div>
            <div className='text-stone-800 space-y-5 border-b-2 border-gray-300 py-5'>
                <ScrollTrigger onEnter={() => setCount(true)} onExit={() => setCount(false)} >
                    <h1 className='text-6xl font-extrabold'> {count &&
                        <CountUp start={0} end={1800}></CountUp>
                    }+
                    </h1>
                </ScrollTrigger>
                <p className='lg:w-3/4'>Students Passed Our Competitions and Got a Job</p>
            </div>
            <div className='text-stone-800 space-y-5 border-b-2 border-gray-300 py-5'>
                <ScrollTrigger onEnter={() => setCount(true)} onExit={() => setCount(false)} >
                    <h1 className='text-6xl font-extrabold'> {count &&
                        <CountUp start={0} end={25}></CountUp>
                    }/85
                    </h1>
                </ScrollTrigger>
                <p className='lg:w-4/5'>The Ratio of Theory and Practice in Each Course</p>
            </div>
            <div className='text-stone-800 space-y-5 border-b-2 border-gray-300 py-5'>
                <ScrollTrigger onEnter={() => setCount(true)} onExit={() => setCount(false)} >
                    <h1 className='text-6xl font-extrabold'> {count &&
                        <CountUp start={0} end={50}></CountUp>
                    }+
                    </h1>
                </ScrollTrigger>
                <p className='lg:w-4/6'>We teach people from 4 continents and over 50 countries</p>
            </div>

        </div >
    );
};

export default Counts;