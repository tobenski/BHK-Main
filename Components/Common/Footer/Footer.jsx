import styled from 'styled-components'
import Hjemsted from './Hjemsted'
import Kontakt from './Kontakt'
import Social from './Social'
import { FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa'
import { IoPerson } from 'react-icons/io5'

const Footer = () => {
    return (
        <Wrapper>
            <Hjemsted />
            <Kontakt />
            <Social />
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    bottom: 0;
    color: var(--text-color-footer);
    background-color: var(--bg-color-footer);
    height: 100%;
    padding-top: 2rem;
    padding-bottom: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
`

export default Footer
