import styled from 'styled-components'
import Logo from './Logo'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useSiteContext } from '../../../contexts/siteContext'

const Header = () => {
    const { toggleNav, navIsOpen } = useSiteContext()

    return (
        <Navbar>
            <Wrapper>
                <Logo />

                <Right>
                    {navIsOpen ? (
                        <FaTimes className='icon' onClick={() => toggleNav()} />
                    ) : (
                        <FaBars className='icon' onClick={() => toggleNav()} />
                    )}
                </Right>
            </Wrapper>
            <Divider></Divider>
        </Navbar>
    )
}

const Navbar = styled.nav`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;
`
const Wrapper = styled.header`
    color: var(--text-color-header);
    background-color: var(--bg-color-header);

    height: 5.25rem;

    //height: 3.5rem; // TODO den stemmer nok ikke, og kan den ikke laves så den bare bruger den plads der skal til.
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    padding-left: 1.6rem;
    padding-right: 1.6rem;

    @media only screen and (min-width: 640px) {
        height: 7rem;
    }
`
const Right = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & > * {
        margin-left: 2rem;
        cursor: pointer;
    }
`
const MenuTekst = styled.span`
    display: none;
    font-size: 2rem;

    &:hover {
        font-weight: 900;
    }

    @media only screen and (min-width: 640px) {
        display: inherit;
    }
`

const Divider = styled.div`
    height: 5rem;
    width: 100%;
    background-image: linear-gradient(
        var(--bg-team-color),
        var(--bg-team-dark)
    );
`

export default Header
