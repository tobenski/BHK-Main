import { pagesApi, settingsApi } from '../Utils/api'
import styled from 'styled-components'
import Loading from '../Components/Common/Loading/Loading'
import Error from '../Components/Common/Error/Error'
import useMedia from '../Hooks/useMedia'
import useSettings from '../Hooks/useSettings'

export const getServerSideProps = async (ctx) => {
    try {
        const resp = await fetch(pagesApi(ctx.params.page))
        const ar = await resp.json()
        if (!ar.length) {
            return {
                notFound: true,
            }
        }
        const data = ar[0]
        if (!data.featured_media) {
            const resp = await fetch(`${settingsApi}settings`)
            const settings = await resp.json()
            data.featured_media = settings.default_image
        }
        return {
            props: {
                data,
            },
        }
    } catch (error) {
        console.log(error)
        return {
            notFound: true,
        }
    }
}

const Page = ({ data, error }) => {
    const { data: image, isLoading, isError } = useMedia(data.featured_media)
    if (isLoading || !data || !image) return <Loading />
    if (error || isError)
        return (
            <h1>
                <Error />, {isError}
            </h1>
        )
    return (
        <Wrapper
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${image.guid.rendered})`,
            }}>
            <h1>{data.title.rendered}</h1>
            <Content
                dangerouslySetInnerHTML={{ __html: data.content.rendered }}
                // dangerouslySetInnerHTML={{ __html: page }}
            />
        </Wrapper>
    )
}

const Wrapper = styled.section`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    color: var(--text-dark-bg);

    padding-top: 5rem;
    padding-bottom: 5rem;

    h1 {
        margin-top: 1rem;
        margin-bottom: 2rem;
    }

    @media only screen and (min-width: 640px) {
    }

    @media only screen and (min-width: 768px) {
    }

    @media only screen and (min-width: 1536px) {
    }
`
const Content = styled.div`
    border-radius: 2rem;
    width: 70%;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-page-content);
    color: var(--text-color);
    padding: 5rem 5rem;
    p {
        margin-bottom: 1rem;
        font-size: 1.5rem;
        line-height: 1.3;
        text-align: left;
    }
    img {
        max-width: 100%;
        max-height: 100%;
    }
    a {
        color: var(--text-color);
        font-style: italic;
    }
    a:hover {
        color: var(--text-black);
    }
    @media only screen and (min-width: 768px) {
        /* flex-direction: column; */
    }
    @media only screen and (min-width: 1024px) {
        min-height: 50vh;
    }
`

export default Page
