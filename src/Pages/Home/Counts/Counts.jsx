import { useState } from 'react';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

const Counts = () => {
    const [count, setCount] = useState(false)
    return (
        <div>
            <div>
                <ScrollTrigger onEnter={() => setCount(true)} onExit={() => setCount(false)} >
                    {<CountUp start={0} end={100}>
                        {({ countUpRef, start }) => (
                            <div>
                                <span ref={countUpRef} />
                                <button onClick={start}>Start</button>
                            </div>
                        )}
                    </CountUp>}
                </ScrollTrigger>
            </div>

        </div >
    );
};

export default Counts;