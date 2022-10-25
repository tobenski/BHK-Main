import Link from 'next/link'
import styled from 'styled-components'
import useSettings from '../../../Hooks/useSettings'
import { FaEnvelope } from 'react-icons/fa'
import { IoPerson } from 'react-icons/io5'
import Loading from '../Loading/Loading'

const Kontakt = () => {
    const { data, isLoading, isError } = useSettings()

    if (isLoading) return <Loading />
    if (isError) return <h1>ERROR, {isError}</h1>

    return (
        <Column>
            <Header>Kontakt</Header>
            <Mail>
                <a href={`mailto:${data.kontakt.mail}`}>
                    <FaEnvelope className='icon mail' /> {data.kontakt.mail}
                </a>
            </Mail>
            <Person>
                <Link href={data.kontakt.url}>
                    <a>
                        <IoPerson className='icon person' /> Find Kontakt
                    </a>
                </Link>
            </Person>
        </Column>
    )
}

const Header = styled.h2`
    margin-bottom: 1rem;
    text-align: center;
    width: 100%;
`
const Mail = styled.div`
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
    text-align: center;
    width: 100%;
`
const Person = styled.div`
    font-size: 1.6rem;
    text-align: center;
    width: 100%;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 200px;
    margin-bottom: 2rem;
    a {
        font-size: 1.6rem;
        text-decoration: none;
        color: var(--text-color-footer);
    }

    a:hover {
        font-weight: 900;
    }
    @media only screen and (min-width: 640px) {
        width: 33%;
        min-width: 200px;
    }
`

export default Kontakt
