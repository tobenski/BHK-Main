import Link from 'next/link'
import styled from 'styled-components'
import Error from '../Error/Error'
import Loading from '../Loading/Loading'
import useMedia from '../../../Hooks/useMedia'

export const Slide = ({ data }) => {
    const { data: image, isLoading, isError } = useMedia(data.acf.image)
    if (isLoading) return <Loading />
    if (isError)
        return (
            <h1>
                <Error />, {isError}
            </h1>
        )
    return (
        <Wrapper
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image.guid.rendered})`,
            }}>
            <h1>{data.title.rendered}</h1>
            <h2>{data.acf.subheader}</h2>
            <div
                id='inner'
                dangerouslySetInnerHTML={{
                    __html: data.acf.content,
                }}></div>
            {data.cta && (
                <Link href={data.acf.url} passHref>
                    <Button>{data.acf.cta}</Button>
                </Link>
            )}
        </Wrapper>
    )
}
export const ThumbSlide = ({ data }) => {
    const { data: image, isLoading, isError } = useMedia(data.acf.image)
    if (isLoading) return <Loading />
    if (isError)
        return (
            <h1>
                <Error />, {isError}
            </h1>
        )
    return (
        <Thumbnail
            className='thumbnail'
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image.guid.rendered})`,
            }}>
            <h1>{data.title.rendered}</h1>
        </Thumbnail>
    )
}

const Thumbnail = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    cursor: pointer;
    h1 {
        font-size: 0.5rem;
    }

    @media only screen and (min-width: 640px) {
        h1 {
            font-size: 1rem;
        }
    }
`

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    text-align: center;
    color: var(--text-dark-bg);

    h1 {
        font-size: 1.5rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
    }
    p {
        font-size: 0.75rem;
        width: 85%;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.3;
        text-align: left;
        font-weight: 600;
    }

    h2 {
        font-size: 0.85rem;
        margin-bottom: 1.5rem;
    }
    #inner {
        max-width: 75%;
        background-color: rgba(0, 0, 0, 0.15);
        padding-top: 2rem;
        padding-bottom: 2rem;
        border-radius: 1rem;
    }
    @media only screen and (min-width: 640px) {
        h1 {
            font-size: 2rem;
        }
        h2 {
            font-size: 1.25rem;
        }
        p {
            font-size: 1rem;
            width: 90%;
        }
    }

    @media only screen and (min-width: 768px) {
        h1 {
            font-size: 3rem;
        }
        h2 {
            font-size: 1.5rem;
        }
    }

    @media only screen and (min-width: 1536px) {
        h1 {
            font-size: 4rem;
        }
        h2 {
            font-size: 2rem;
        }
        p {
            font-size: 1.25rem;
            width: 75%;
        }
    }
`

const Button = styled.a`
    display: block;
    width: 200px;

    padding: 1rem;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;

    color: white;
    text-decoration: none;
    font-size: 1.5em;

    border: 3px solid white;
    border-radius: 20px;
    background-color: transparent;
    &:hover {
        background-color: rgba(255, 255, 255, 0.5);
    }
`

// export default Slide
