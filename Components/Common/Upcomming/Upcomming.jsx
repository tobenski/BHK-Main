import useGames from '../../../Hooks/useGames'
import styled from 'styled-components'
import Error from '../Error/Error'
import Loading from '../Loading/Loading'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Pagination, Navigation } from 'swiper'

const Upcomming = () => {
    const { data, isLoading, isError } = useGames()

    if (isLoading) return <Loading />
    if (isError)
        return (
            <h1>
                <Error />, {isError}
            </h1>
        )

    return (
        <Games id='games'>
            <Header>Kommende Kampe</Header>
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
                centeredSlides={true}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Navigation]}
                className='wrapper'>
                {data.map((game, i) => {
                    const [day, month, year] = game.date.split('-')
                    const date = new Date(year, month - 1, day)
                    if (date <= Date.now()) {
                        return
                    }
                    return (
                        <SwiperSlide key={i.toString()} className='card'>
                            <Slide data={game} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Games>
    )
}

const Slide = ({ data }) => {
    return (
        <Inner>
            <CardHeader
                dangerouslySetInnerHTML={{
                    __html: 'Brædstrup HK vs. ' + data.acf.opponent,
                }}></CardHeader>
            <CardSubHeader>{data.acf.team}</CardSubHeader>
            <DateWrapper>{data.acf.date + ' ' + data.acf.time}</DateWrapper>
            <Location>
                {data.acf.home ? 'Brædstrup Hallen' : data.acf.opponent}
            </Location>
        </Inner>
    )
}

// TODO JEg tror kortet skal laves om til:
// Dato & Tid
// Title med Hvem spillle fx. Brædstrup HK vs Stensballe IK 2
// Hvilket Hold fx. U-13 Piger
// Hvorhenne.

const Games = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 100%;
    margin-bottom: 4rem;
    line-height: 1.3;
    font-size: 1.6rem;
    .wrapper {
        width: 90vw;
        margin: 0 auto;
        .card {
            position: relative;
            text-decoration: none;
            margin-bottom: 3rem;
            // margin: 3rem 0;
            max-width: 20vw;
            border-radius: 0.5rem;
            box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
            a {
                text-decoration: none;
            }
        }
    }
`
const Header = styled.h2`
    margin-bottom: 2rem;
    font-weight: 900;
    margin-left: 1rem;
    margin-right: 1rem;
`

const Inner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    box-sizing: border-box;
    padding: 20px 10px;
    border-radius: 0.5rem;
    box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
`
const CardHeader = styled.h3`
    color: var(--text-color);
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: 2rem;
    font-weight: 900;
`

const CardSubHeader = styled.h4`
    color: var(--text-color);
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    font-weight: 900;
`
const DateWrapper = styled.time`
    font-size: 1rem;
    text-decoration: none;
    color: var(--text-color);
    margin-bottom: 0.5rem;
`
const Location = styled.div`
    font-size: 1rem;
    text-decoration: none;
    color: var(--text-color);
    margin-bottom: 0.5rem;
`

export default Upcomming
