import Loading from '../Loading/Loading'
import styled from 'styled-components'
import { useSiteContext } from '../../../contexts/siteContext'
import React from 'react'
import Link from 'next/link'

// TODO: LAv det som en Accordion så kun toplevel LInks er synlige.

const Menu = () => {
    const { closeNav, navIsOpen, navi, error } = useSiteContext()
    if (!error && !navi) return <Loading />
    if (error) return <h1>ERROR, {error}</h1>

    return (
        <Overlay id='myNav' style={{ height: navIsOpen ? '100%' : '0' }}>
            <OverlayContent className='overlay-content'>
                {navi.map((item, i) => {
                    return (
                        <React.Fragment key={item.ID}>
                            <Link href={item.acf.relative_url} scroll={true}>
                                <TopLink onClick={() => closeNav()}>
                                    {item.title}
                                </TopLink>
                            </Link>
                            {item.child_items &&
                                item.child_items.map((sub, i) => {
                                    return (
                                        <Link
                                            href={sub.acf.relative_url}
                                            key={sub.ID}
                                            scroll={false}>
                                            <SubLink onClick={() => closeNav()}>
                                                {sub.title}
                                            </SubLink>
                                        </Link>
                                    )
                                })}
                        </React.Fragment>
                    )
                })}
            </OverlayContent>
        </Overlay>
    )
}

const Overlay = styled.div`
    height: 0%;
    width: 100%;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 10.25rem;
    background-color: var(--bg-color-navigation);
    overflow: hidden;
    transition: 0.5s;
    @media only screen and (min-width: 640px) {
        top: 12rem;
    }
`
const TopLink = styled.a`
    padding: 8px;
    text-decoration: none;
    font-size: 3.6rem;
    color: var(--text-color-navigation);
    display: block; /* Display block instead of inline */
    transition: 0.3s; /* Transition effects on hover (color) */
    cursor: pointer;
    &:hover,
    &:focus {
        color: var(--text-color-navigation-hover);
    }
`
const SubLink = styled.a`
    padding: 4px;
    text-decoration: none;
    font-size: 1.6rem;
    color: var(--text-color-navigation);
    display: block; /* Display block instead of inline */
    transition: 0.3s; /* Transition effects on hover (color) */
    cursor: pointer;
    &:hover,
    &:focus {
        color: var(--text-color-navigation-hover);
    }
`

const OverlayContent = styled.div`
    position: relative;
    top: 5%;
    width: 100%;
    text-align: center;
    pointer-events: all;
`

export default Menu
