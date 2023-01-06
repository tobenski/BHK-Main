import useNews from '../../../Hooks/useNews'
import styled from 'styled-components'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import useMedia from '../../../Hooks/useMedia'
import { useState } from 'react'
import Modal from '../Modal/Modal'
import { useSiteContext } from '../../../contexts/siteContext'

const News = () => {
    const { data, isLoading, isError } = useNews()

    if (isLoading) return <Loading />
    if (isError)
        return (
            <h1>
                <Error />, {isError}
            </h1>
        )
    const sorted_data = data.sort((a, b) => a.menu_order - b.menu_order)
    return (
        // console.log(Date.now());
        <NewsWrapper id='nyheder'>
            <Header>Nyheder</Header>
            <CardWrapper>
                {sorted_data.map((n, i) => {
                    const dato = new Date()
                    if (n.acf.udlobsdato) {
                        dato.setFullYear(n.acf.udlobsdato.slice(0, 4))
                        dato.setMonth(n.acf.udlobsdato.slice(4, 6) - 1)
                        dato.setDate(n.acf.udlobsdato.slice(6))
                    } else {
                        dato.setFullYear(2199)
                    }
                    return (
                        n.acf.online &&
                        new Date() < dato && (
                            <NewsCard key={i.toString()} card={n} />
                        )
                    )
                })}
            </CardWrapper>
        </NewsWrapper>
    )
}

const NewsWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    margin-bottom: 4rem;
    margin-left: auto;
    margin-right: auto;
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
    const { openModal, setModal } = useSiteContext()
    if (isLoading) return <Loading />
    if (isError)
        return (
            <h1>
                <Error />, {isError}
            </h1>
        )
    return (
        <Card onClick={() => openModal(card, image)}>
            <CardImage src={image.guid.rendered} alt={card.title.rendered} />
            <CardHeader>{card.title.rendered}</CardHeader>
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
    max-width: 95%;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;

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
