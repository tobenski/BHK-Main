import Error from '../Error/Error'
import Loading from '../Loading/Loading'
import useMedia from '../../../Hooks/useMedia'
import styled from 'styled-components'

const Sponsor = ({ data }) => {
    const { data: image, isLoading, isError } = useMedia(data.acf.image)
    if (isLoading) return <Loading />
    if (isError)
        return (
            <h1>
                <Error />, {isError}
            </h1>
        )
    return (
        <a href={data.acf.url} target='_blank' rel='noreferrer'>
            <Logo src={image.guid.rendered} />
        </a>
    )
}

const Logo = styled.img`
    /* width: auto; */
    max-width: 100%;
    height: 112px;
    /* height: 100%; */
`

export default Sponsor
