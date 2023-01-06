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
    const getTidspunkt = (date, time) => {
        return new Date(
            date.slice(0, 4),
            date.slice(4, 6) - 1,
            date.slice(6),
            time.slice(0, 2),
            time.slice(3, 5)
        )
    }
    const sortedData = data.sort(
        (a, b) =>
            getTidspunkt(a.acf.date, a.acf.time).getTime() -
            getTidspunkt(b.acf.date, b.acf.time).getTime()
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
                {sortedData.map((game, i) => {
                    const date = getTidspunkt(game.acf.date, game.acf.time)
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
    const tidspunkt = new Date(
        data.acf.date.slice(0, 4),
        data.acf.date.slice(4, 6) - 1,
        data.acf.date.slice(6),
        data.acf.time.slice(0, 2),
        data.acf.time.slice(3, 5)
    )
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }
    const header = data.acf.home
        ? 'Brædstrup HK <> ' + data.acf.opponent
        : data.acf.opponent + ' <> Brædstrup HK'
    return (
        <Inner>
            <DateWrapper>
                {tidspunkt.toLocaleString('da-DK', options)}
            </DateWrapper>
            <CardHeader
                dangerouslySetInnerHTML={{
                    __html: header,
                }}></CardHeader>
            <CardSubHeader>{data.acf.team}</CardSubHeader>
        </Inner>
    )
}

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
            max-width: 40vw;
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
const CardHeader = styled.h5`
    color: var(--text-color);
    text-align: center;
    margin-bottom: 0.5rem;
    /* font-size: 2rem; */
    font-weight: 900;
`

const CardSubHeader = styled.h6`
    color: var(--text-color);
    text-align: center;
    margin-bottom: 0.5rem;
    /* font-size: 1.2rem; */
    font-weight: 900;
`
const DateWrapper = styled.h3`
    font-size: 1rem;
    text-decoration: none;
    color: var(--text-color);
    margin-bottom: 0.5rem;
    ::first-letter {
        text-transform: capitalize;
    }
`
const Location = styled.div`
    font-size: 1rem;
    text-decoration: none;
    color: var(--text-color);
    margin-bottom: 0.5rem;
`

export default Upcomming
