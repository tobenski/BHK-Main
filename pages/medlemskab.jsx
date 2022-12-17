import Error from '../Components/Common/Error/Error'
import Loading from '../Components/Common/Loading/Loading'
import styled from 'styled-components'
import { holdOversigtUrl } from '../Utils/conventus'
import { teamsRegex } from '../Utils/regex'
import { findMatches } from '../Utils/functions'
import HoldPopup from '../Components/Medlemskab/HoldPopup'
import { useState } from 'react'
import { pagesApi } from '../Utils/api'
import useMedia from '../Hooks/useMedia'

export const getServerSideProps = async (context) => {
    try {
        const resp = await fetch(pagesApi('medlemskab'))
        const ar = await resp.json()
        if (!ar.length) {
            return {
                notFound: true,
            }
        }
        const data = ar[0]
        const teamResp = await fetch(holdOversigtUrl())
        const teamData = await teamResp.text()
        const teams = findMatches(teamsRegex, teamData)
        return {
            props: {
                data,
                teams,
            },
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
                error: JSON.stringify(error.message),
            },
        }
    }
}

const Medlemskab = ({ data, teams, error }) => {
    const { data: image, isLoading, isError } = useMedia(data.featured_media)
    const [gruppeId, setGruppeId] = useState(null)
    if (isLoading || !teams) return <Loading />

    if (isError || error)
        return (
            <h1>
                <Error />, {isError}
            </h1>
        )

    // TODO: FIX på MOBIL
    return (
        <>
            <Wrapper
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${image.guid.rendered})`,
                }}>
                <h1>{data.title.rendered}</h1>
                <HoldWrapper>
                    <HoldListe>
                        {teams.map((t, i) => {
                            return (
                                <Hold
                                    key={t[3]}
                                    value={t[3]}
                                    dangerouslySetInnerHTML={{ __html: t[2] }}
                                    onClick={(e) => setGruppeId(e.target.value)}
                                />
                            )
                        })}
                    </HoldListe>
                    {gruppeId ? (
                        <HoldPopup gruppeId={gruppeId} />
                    ) : (
                        <Inner>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: data.content.rendered,
                                }}
                            />
                        </Inner>
                    )}
                </HoldWrapper>
            </Wrapper>
        </>
    )
}

const Inner = styled.div`
    /* width: 60%; */
    padding: 5rem 2rem;

    color: var(--text-color);
    @media only screen and (min-width: 768px) {
        width: 60%;
    }
`

const Wrapper = styled.section`
    width: 100%;
    height: 100%;
    /* min-height: 100vh; */
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    color: var(--text-dark-bg);

    padding-top: 5rem;
    padding-bottom: 5rem;

    h1 {
        margin-top: 1rem;
        margin-bottom: 2rem;
    }
    p {
        font-size: 1.5rem;
        width: 70%;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.3;
        text-align: left;
        /* font-weight: 600; */
    }

    @media only screen and (min-width: 640px) {
    }

    @media only screen and (min-width: 768px) {
    }

    @media only screen and (min-width: 1536px) {
    }
`
const HoldWrapper = styled.div`
    // TODO: SKAL NOK STAKKE PÅ MINDRE SKÆRME.
    border-radius: 2rem;
    width: 70%;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-page-content);
    @media only screen and (min-width: 768px) {
        flex-direction: row;
    }
    @media only screen and (min-width: 1024px) {
        min-height: 50vh;
    }
`
const HoldListe = styled.div`
    padding: 5rem 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    border-bottom: 1px solid black;
    @media only screen and (min-width: 768px) {
        width: 40%;
        border-bottom: none;
        border-right: 1px solid black;
    }
`
const HoldListeHeader = styled.h3`
    color: black;
    padding: 1rem;
    /* background-color: #f0f0f0; */
`
const Hold = styled.button`
    background-color: transparent;
    border: none;
    padding: 0.5rem 3rem;
    color: var(--text-color);
    &:hover,
    &:focus {
        background-color: var(--bg-page-content-hover-hold);
    }
`

export default Medlemskab
