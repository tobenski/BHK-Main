import styled from 'styled-components'
import useSettings from '../../../Hooks/useSettings'
import Loading from '../Loading/Loading'

const Hjemsted = () => {
    const { data, isLoading, isError } = useSettings()

    if (isLoading) return <Loading />
    if (isError) return <h1>ERROR, {isError}</h1>
    return (
        <Column>
            <Header>Hjemsted</Header>
            <Name dangerouslySetInnerHTML={{ __html: data.hjemsted.name }} />
            <Adress
                dangerouslySetInnerHTML={{ __html: data.hjemsted.adress }}
            />
        </Column>
    )
}

// TODO: Add link til google maps.

const Header = styled.h2`
    margin-bottom: 1rem;
    text-align: center;
    width: 100%;
`
const Name = styled.div`
    font-size: 1.6rem;
    font-weight: 900;
    text-align: center;
    width: 100%;
`
const Adress = styled.div`
    font-size: 1.6rem;
    text-align: center;
    width: 100%;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 100%;
    min-width: 200px;
    margin-bottom: 2rem;

    @media only screen and (min-width: 640px) {
        width: 33%;
        min-width: 200px;
    }
`

export default Hjemsted
