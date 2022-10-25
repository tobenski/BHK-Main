import Events from '../Components/Common/Events/Events'
import Hero from '../Components/Common/Hero/Hero'
import News from '../Components/Common/News/News'
import Sponsors from '../Components/Common/Sponsor/Sponsors'
import Upcomming from '../Components/Common/Upcomming/Upcomming'

const Home = () => {
    return (
        <>
            <Hero />
            <Sponsors />
            <News />
            <Upcomming />
            <Events />
        </>
    )
}

export default Home
