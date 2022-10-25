import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import useSettings from '../../../Hooks/useSettings'
import Loading from '../Loading/Loading'

const Logo = () => {
    const { data, isLoading, isError } = useSettings()

    if (isLoading) return <Loading />
    if (isError) return <h1>ERROR, {isError}</h1>
    
    return (
        <Outer>
            <Link href='/#top'>
                <a> 
                    <Image
                        src={data.logo.image}
                        alt={data.logo.alt}
                        layout='fill'
                    />
                </a>
            </Link>
        </Outer>
    )
}

const Outer = styled.div`
    width: 175px;
    height: 56px;
    position: relative;
    top: 26px;

    //z-index: 102;
    @media only screen and (min-width: 640px) {
        width: 356px;
        height: 112px;
        top: 50px;
    }
`

export default Logo

// TODO Kan jeg ikke sende hæjde og bredde info med over, og lade det være responsiv?
// TODO: Ændre Logo image parent til relative i stedet for static. 