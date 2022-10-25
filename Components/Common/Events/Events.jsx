import useEvents from '../../../Hooks/useEvents'
import styled from 'styled-components'
import Loading from '../Loading/Loading'
import Event from './Event'

const Events = () => {
    const { data, isLoading, isError } = useEvents()

    if (isLoading) return <Loading />
    if (isError) return <h1>ERROR, {isError}</h1>
    return (
        <EventsWrapper id='events'>
            <Header>{data.header}</Header>
            <CardWrapper>
                {data.events.map((e, i) => {
                    return <Event key={i.toString()} event={e} />
                })}
            </CardWrapper>
        </EventsWrapper>
    )
}

const EventsWrapper = styled.section`
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
    grid-template-columns: repeat(auto-fit, minmax(32%, 1fr));
    gap: 1.5rem;
    max-width: 100vw;
    width: 150ch;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: auto;
    margin-right: auto;
    @media only screen and (min-width: 640px) {
        width: 90vw;
    }
`

export default Events