import styled from 'styled-components'
import useMedia from '../../../Hooks/useMedia'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import { useSiteContext } from '../../../contexts/siteContext'

const Event = ({ event }) => {
    const { data, isLoading, isError } = useMedia(event.acf.image)
    const { openModal } = useSiteContext()
    if (isLoading) return <Loading />
    if (isError)
        return (
            <h1>
                <Error />, {isError}
            </h1>
        )
    const tidspunkt = new Date(event.acf.date)
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }
    return (
        <Card onClick={() => openModal(event, data)}>
            <CardImage src={data.guid.rendered} />
            <CardHeader>{event.title.rendered}</CardHeader>
            <DateWrap>{tidspunkt.toLocaleString('da-DK', options)}</DateWrap>
            <CardContent
                dangerouslySetInnerHTML={{
                    __html: event.acf.content.slice(0, 200) + '...',
                }}></CardContent>
        </Card>
    )
}

const Card = styled.article`
    --card-gradient: rgba(0, 0, 0, 0.8);
    --card-gradient: var(--bg-team-color), var(--bg-team-dark); // #5e9ad9, #e271ad;
    --card-blend-mode: overlay;

    background-color: var(--bg-site);
    border-radius: 0.5rem;
    box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
    background-image: linear-gradient(
        var(--card-gradient),
        white max(12.5rem, 47ch)
    );
    overflow: hidden;
    max-width: 100%;
    width: 40ch;
    cursor: pointer;
    > :last-child {
        margin-bottom: 0;
    }

    &:hover,
    &:focus-within {
        --card-gradient: #24a9d5 max(8.5rem, 20vh);
    }
    @media only screen and (min-width: 640px) {
        width: 100%;
    }
`
const CardImage = styled.img`
    border-radius: 0.5rem 0.5rem 0 0;
    width: 100%;
    object-fit: cover;
    max-height: max(10rem, 30vh);
    aspect-ratio: 4/3;
    mix-blend-mode: var(--card-blend-mode);

    ~ * {
        margin-left: 1rem;
        margin-right: 1rem;
    }
`
const CardHeader = styled.h3`
    margin-top: 1rem;
    margin-bottom: 0.5rem;
`
const Subtitle = styled.h4`
    margin-bottom: 0.5rem;
`
const DateWrap = styled.h6`
    margin-bottom: 0.5rem;
    opacity: 80%;
    ::first-letter {
        text-transform: capitalize;
    }
`
const CardContent = styled.div`
    padding-bottom: 2rem;
    text-align: left;
`

export default Event
