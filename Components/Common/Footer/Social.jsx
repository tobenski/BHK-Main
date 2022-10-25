import styled from 'styled-components'
import useSettings from '../../../Hooks/useSettings'
import { FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa'
import Loading from '../Loading/Loading'

const Social = () => {
    const { data, isLoading, isError } = useSettings()

    if (isLoading) return <Loading />
    if (isError) return <h1>ERROR, {isError}</h1>

    return (
        <Column>
            <Header>Følg Os</Header>
            <SocialWrapper>
                <a href={data.social.facebook} target='blank'>
                    <FaFacebook className='icon facebook' />
                </a>
                <a href={data.social.instagram} target='blank'>
                    <FaInstagram className='icon instagram' />
                </a>
            </SocialWrapper>
        </Column>
    )
}

const Header = styled.h2`
    margin-bottom: 1rem;
`

const SocialWrapper = styled.div`
    text-align: left;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 200px;
    margin-bottom: 2rem;
    a {
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
export default Social
