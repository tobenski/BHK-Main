import useNews from '../../../Hooks/useNews'
import styled from 'styled-components'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import useMedia from '../../../Hooks/useMedia'

const News = () => {
    const { data, isLoading, isError } = useNews()

    if (isLoading) return <Loading />
    if (isError)
        return (
            <h1>
                <Error />, {isError}
            </h1>
        )

    return (
        <NewsWrapper id='nyheder'>
            <Header>Nyheder</Header>
            <CardWrapper>
                {data.map((n, i) => {
                    return <NewsCard key={i.toString()} card={n} />
                })}
            </CardWrapper>
        </NewsWrapper>
    )
}

const NewsWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 100%;
    margin-bottom: 4rem;
`
const Header = styled.h2`
    margin-bottom: 2rem;
    font-weight: 900;
    margin-left: 1rem;
    margin-right: 1rem;
`
const CardWrapper = styled.div`
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(33%, 1fr));
    /* gap: 1.5rem; */
    width: 100%;
    max-width: 90vw;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: auto;
    margin-right: auto;
`

const NewsCard = ({ card }) => {
    const { data: image, isLoading, isError } = useMedia(card.acf.image)
    if (isLoading) return <Loading />
    if (isError)
        return (
            <h1>
                <Error />, {isError}
            </h1>
        )
    return (
        <Card>
            <CardImage src={image.guid.rendered} alt={card.title.rendered} />
            <CardHeader>
                <a
                    href={card.acf.url}
                    dangerouslySetInnerHTML={{
                        __html: card.title.rendered,
                    }}></a>
                {/* TODO LAV DET TIL EN NEXT LINK DER RAMMER EN INTERN SIDE MED NYHEDEN (ELLER EN MODAL MED NYHEDEN) */}
            </CardHeader>
            <CardContent
                dangerouslySetInnerHTML={{
                    __html: card.acf.manchet,
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
        white max(9.5rem, 27ch)
    );
    overflow: hidden;
    max-width: 80%;

    > :last-child {
        margin-bottom: 0;
    }

    &:hover,
    &:focus-within {
        --card-gradient: #24a9d5 max(8.5rem, 20vh);
    }

    a {
        color: inherit;
    }
`
const CardImage = styled.img`
    border-radius: 0.5rem 0.5rem 0 0;
    width: 100%;
    object-fit: cover;
    max-height: max(10rem, 30vh);
    aspect-ratio: 4/3;
    mix-blend-mode: var(--card-blend-mode);

    & ~ * {
        margin-left: 1rem;
        margin-right: 1rem;
    }
`
const CardHeader = styled.h3`
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    // font-size: 1.25rem;
`
const CardContent = styled.div`
    padding-bottom: 2rem;
    text-align: left;
`

export default News
