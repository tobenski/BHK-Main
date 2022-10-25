import styled from "styled-components";
import useTeams from "../../Hooks/useTeams";
import { tilmeldHoldUrl } from "../../Utils/conventus";
import Error from "../Common/Error/Error";
import Loading from "../Common/Loading/Loading";


const HoldPopup = ({gruppeId}) => {    
    const {data, isLoading, isError } = useTeams(gruppeId)
    if (isLoading) return (<Wrapper><Loading /></Wrapper>)
    if (isError) return <Error error={isError} /> 
    return (
        <Wrapper>
            <Header>{data.name}</Header>
            <Row>
                <p dangerouslySetInnerHTML={{ __html: data.description}} />
            </Row>
            {data.times.length > 0 &&
            <Row>
                <p><strong>Trænings tidspunkt{data.times.length > 1 && 'er'}</strong></p> 
                {data.times.map((t, i) => {
                    return <p key={i.toString()} dangerouslySetInnerHTML={{__html: t}} />
                })}
            </Row>}
            {data.coaches.length > 0 && <Row>
                <p><strong>Træner{data.coaches.length > 1 && 'e'}:</strong></p> 
                {data.coaches.map((c, i) => {
                    return <p key={i.toString()} dangerouslySetInnerHTML={{__html:c.replace('Træner ', '')}} />
                })}
            </Row>}
            <Row>
                <p><strong>Pris:</strong></p>
                <p>{data.price},-</p>
            </Row>
            <Row>
                <Button href={tilmeldHoldUrl(gruppeId)} target='_blank' >Tilmeld</Button>
            </Row>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    padding: 5rem 2rem;    
    color: black;
    @media only screen and (min-width: 768px) {
        width: 60%;
    }    
`
const Header = styled.h3`
    margin-bottom: 2rem;
`
const Row = styled.div`
    margin-bottom: 2rem;
    p {
        font-weight: 100;
    }
`

const Button = styled.a`
    padding: 1rem 4rem;
    border: 0.25rem solid black;
    border-radius: 2rem;
    text-decoration: none;
    color: black;
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: 900;
    background-color: rgba(240,240,240,0.5);
    &:hover {
        background-color: rgba(240,240,240,0.3);
    }
`

export default HoldPopup;