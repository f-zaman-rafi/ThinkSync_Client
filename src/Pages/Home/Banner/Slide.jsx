/* eslint-disable react/prop-types */


const Slide = ({ image, text, textColor }) => {


    return (
        <header>
            <div className="hero min-h-screen relative" style={{ backgroundImage: `url(${image})` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/40"></div>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="">
                        <h1 className={`lg:mb-5 text-4xl lg:text-5xl font-bold leading-loose font-philosopher ${textColor}`}>{text}</h1>

                    </div>
                </div>
            </div>
        </header >
    );
};

export default Slide;

// 'stardos': ['Stardos Stencil', 'system-ui'],
//         'protest-revolution': ['Protest Revolution', 'sans-serif'],
//         'philosopher': ['Philosopher', 'sans-serif'],
//         'raleway': ['Raleway Dots', 'sans-serif'],
//         'roboto': ['Roboto', 'sans-serif'],
//         'playfair': ['Playfair Display', 'system-ui'],
//         'roboto-mono': ['Roboto Mono', 'monospace'],