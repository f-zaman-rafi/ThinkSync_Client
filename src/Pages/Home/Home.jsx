import Banner from "./Banner/Banner";
import StudySessionSection from "./StudySession/StudySessionSection";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>ThinkSync | Home</title>
            </Helmet>
            <Banner></Banner>
            <StudySessionSection></StudySessionSection>
        </div>
    );
};

export default Home;