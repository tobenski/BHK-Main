import styled from 'styled-components'
import Loading from '../Loading/Loading'
import useSponsors from '../../../Hooks/useSponsors'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper'
import Sponsor from './Sponsor'

const Sponsors = () => {
    const { data, isLoading, isError } = useSponsors()

    if (isLoading) return <Loading />
    if (isError) return <h1>ERROR, {isError}</h1>

    return (
        <SponserSection id='sponsor'>
            <Header>Støt sponsorne - De støtter os...</Header>
            <Wrapper>
                <Swiper
                    spaceBetween={30}
                    slidesPerView='auto'
                    slidesPerGroup={1}
                    loop={true}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    modules={[Autoplay]}
                    className='mySponsorSwiper'>
                    {data.map((s, i) => {
                        return (
                            <SwiperSlide key={i.toString()}>
                                <Sponsor data={s} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </Wrapper>
        </SponserSection>
    )
}

const SponserSection = styled.section`
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 4rem;
    width: 100%;
    max-width: 90vw;
    height: 100%;
    text-align: center;
    h2 {
        margin-bottom: 4rem;
        font-weight: 900;
        margin-left: auto;
        margin-right: auto;
    }
`
const Header = styled.h2``
const Wrapper = styled.div``

export default Sponsors
