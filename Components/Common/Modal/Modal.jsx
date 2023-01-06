import Loading from '../Loading/Loading'
import { useSiteContext } from '../../../contexts/siteContext'
import React, { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { IoCloseCircleOutline } from 'react-icons/io5'

const Modal = () => {
    const {
        closeModal,
        modalIsOpen,
        toggleModal,
        openModal,
        modal,
        modalImage: image,
    } = useSiteContext()

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape' || e.key === 'Backspace' || e.key === 'Delete') {
            closeModal()
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown, false)

        return () => {
            document.removeEventListener('keydown', handleKeyDown, false)
        }
    }, [])

    // PRØV LIGE REF TILGANGEN IGEN NU HVOR: https://devrecipes.net/modal-component-with-next-js-part-2/

    const modalContent = modalIsOpen ? (
        <>
            <StyledModalOverlay>
                <StyledModalWrapper>
                    <Card>
                        <StyledModalHeader>
                            <CardImage
                                src={image.guid.rendered}
                                alt={modal.title.rendered}
                            />
                            <div>
                                <IoCloseCircleOutline
                                    onClick={() => closeModal()}
                                />
                            </div>
                        </StyledModalHeader>
                        <CardHeader>{modal.title.rendered}</CardHeader>
                        <CardContent
                            dangerouslySetInnerHTML={{
                                __html: modal.acf.content,
                            }}></CardContent>
                    </Card>
                </StyledModalWrapper>
            </StyledModalOverlay>
        </>
    ) : null
    if (!modal) return <Loading />
    return modalContent
}

const StyledModalWrapper = styled.div`
    width: 80vw;
    height: 80vh;
    z-index: 1001;
`

const StyledModalHeader = styled.div`
    right: 0;
    top: 0;
    font-size: 4.5rem;
    position: relative;
    display: flex;
    div {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        width: 100%;
        position: absolute;
        padding: 1.5rem;
    }
`
const Card = styled.article`
    --card-gradient: rgba(0, 0, 0, 0.75);
    /* --card-gradient: var(--bg-team-color), var(--bg-team-dark); // #5e9ad9, #e271ad; */
    --card-blend-mode: overlay;

    background-color: var(--bg-site);
    /* padding: 1rem; */
    border-radius: 1.5rem;
    box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
    background-image: linear-gradient(
        var(--card-gradient),
        white max(19.5rem, 57ch)
    );
    overflow: hidden;
    max-width: 95%;
    margin-left: auto;
    margin-right: auto;

    a {
        color: inherit;
    }
`
const CardImage = styled.img`
    border-radius: 1.5rem 1.5rem 0 0;
    width: 100%;
    object-fit: cover;
    max-height: max(10rem, 30vh);
    aspect-ratio: 4/3;
    mix-blend-mode: var(--card-blend-mode);

    & ~ * {
        margin-left: 1rem;
        margin-right: 1rem;
    }
`
const CardHeader = styled.h1`
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 2.5rem;
`
const CardContent = styled.div`
    padding: 2rem;
    text-align: left;
`

const StyledModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
`

export default Modal
