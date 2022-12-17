import { Swiper, SwiperSlide } from 'swiper/react'
import styled from 'styled-components'
import { Slide, ThumbSlide } from './Slide'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import useHeroSlider from '../../../Hooks/useHeroSlider'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

// import Swiper required modules
import { Navigation, Thumbs } from 'swiper'
import { useState } from 'react'

const Hero = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const { data, isLoading, isError } = useHeroSlider()

    if (isLoading) return <Loading />
    if (isError)
        return (
            <h1>
                <Error />, {isError}
            </h1>
        )
    return (
        <HeroSection id='top'>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{
                    swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                }}
                modules={[Navigation, Thumbs]}
                className='myHeroSwiper'>
                {data.map((item, i) => {
                    return (
                        <SwiperSlide className='slides' key={i.toString()}>
                            <Slide data={item} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={5}
                freeMode={false}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className='thumbnails'>
                {data.map((item, i) => {
                    return (
                        <SwiperSlide className='slides' key={i.toString()}>
                            <ThumbSlide data={item} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </HeroSection>
    )
}

const HeroSection = styled.section`
    .myHeroSwiper {
        height: 65vh;
        margin-left: auto;
        margin-right: auto;
        background-color: white;
    }
    .slides {
        background-size: cover;
        background-position: center;
    }

    .thumbnails .slides {
        width: 25%;
        height: 100%;
        opacity: 0.4;
        top: 0;
    }

    .thumbnails {
        height: 10vh;
        box-sizing: border-box;
        padding: 10px 0;
        .swiper-slide-thumb-active {
            opacity: 1;
        }
        .swiper-slide-thumb-active::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-top-width: 15px;
            border-bottom-width: 15px;
            border-top-style: solid;
            border-bottom-style: solid;
            border-top-color: black;
            border-bottom-color: black;
            // border: 2px solid #3772ff;
            pointer-events: none;
            z-index: 1;
        }
    }
`

export default Hero
