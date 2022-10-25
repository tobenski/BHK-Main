import Error from "../Components/Common/Error/Error"
import Loading from "../Components/Common/Loading/Loading"
import styled from "styled-components"
import { holdOversigtUrl, proxyServer } from "../Utils/conventus"
import { teamsRegex } from "../Utils/regex"
import { findMatches } from "../Utils/functions"
import HoldPopup from "../Components/Medlemskab/HoldPopup"
import { useState } from "react"
import { mediaApi, pagesApi } from "../Utils/api"

export const getServerSideProps = async (context) => {
    try {
        const res = await fetch(pagesApi)
        const pages = await res.json()
        const data = pages.find(p => p.slug == 'medlemskab')
        const imageRes = await fetch(mediaApi(data.featured_media))
        const imageData = await imageRes.json()
        // const teamResp = await fetch(proxyServer, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({url: holdOversigtUrl()}),
        // })
        const teamResp = await fetch(holdOversigtUrl())
        // console.log(teamResp);
        const teamData = await teamResp.text()
        const teams = findMatches(teamsRegex, teamData)
        return {
            props: {
                data,
                imageData,
                teams,
            }
        }
    } catch (error) {
        // console.log(error);
        return {
            props: {
                error: JSON.stringify(error)
            }
        }
    }

}


const Medlemskab = ({data, imageData, teams, error}) => {
    // const [gruppeId, setGruppeId] = useState(teams[0][3])
    const [gruppeId, setGruppeId] = useState(null)
    if (error) return <Error error={error} />
    if (!data || !imageData || !teams) return <Loading />
    // TODO: FIX på MOBIL
    return <>
        <Wrapper style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${imageData.guid.rendered})`,
            }}>
             <h1>{data.title.rendered}</h1>
            <HoldWrapper>
                <HoldListe>
                    {teams.map((t, i) => {
                        return <Hold key={t[3]} value={t[3]} dangerouslySetInnerHTML={{ __html:t[2]}} onClick={(e) => setGruppeId(e.target.value)} />
                        })}
                </HoldListe>
                {gruppeId ? 
                    <HoldPopup gruppeId={gruppeId} /> 
                        : 
                    (<Inner>
                        <div dangerouslySetInnerHTML={{  __html: data.content.rendered}} />
                    </Inner>)}
                
            </HoldWrapper>
        </Wrapper>
    </>
};

const Inner = styled.div`
    /* width: 60%; */
    padding: 5rem 2rem;
    
    color: black;
    @media only screen and (min-width: 768px) {
        width: 60%;
    }
`

const Wrapper = styled.section`
    width: 100%;
    height: 100%;
    min-height: 100vh;
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
const HoldWrapper = styled.div` // TODO: SKAL NOK STAKKE PÅ MINDRE SKÆRME.
    border-radius: 2rem;
    width: 70%;
    display: flex;
    flex-direction: column;
    background-color: rgba(240,240,240,0.5);
    @media only screen and (min-width: 768px) {
        flex-direction: row;
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
    &:hover, &:focus {
        background-color: darkgray;
    }
`



export default Medlemskab
