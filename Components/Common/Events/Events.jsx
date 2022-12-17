import useEvents from '../../../Hooks/useEvents'
import styled from 'styled-components'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import Event from './Event'

const Events = () => {
    const { data, isLoading, isError } = useEvents()

    if (isLoading) return <Loading />
    if (isError)
        return (
            <h1>
                <Error />, {isError}
            </h1>
        )
    // console.log(data)
    return (
        <EventsWrapper id='events'>
            <Header>Arrangementer</Header>
            <CardWrapper>
                {data.map((e, i) => {
                    // console.log(e)
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
