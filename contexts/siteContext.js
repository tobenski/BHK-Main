import { createContext, useContext, useEffect, useState } from 'react'
import { navigationApi } from '../Utils/api'

const SiteContext = createContext()

export const SiteProvider = ({ children }) => {
    const [navIsOpen, setNavIsOpen] = useState(false)
    const [navi, setNavi] = useState([])
    const [error, setError] = useState(false)

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modal, setModal] = useState(null)
    const [modalImage, setModalImage] = useState(null)

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen)
    }

    const openModal = (card, image) => {
        setModal(card)
        setModalImage(image)
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModal(null)
        setModalImage(null)
        setModalIsOpen(false)
    }

    const toggleNav = () => {
        setNavIsOpen(!navIsOpen)
    }

    const openNav = () => {
        setNavIsOpen(true)
    }

    const closeNav = () => {
        setNavIsOpen(false)
    }

    const getNavi = async () => {
        try {
            // const resp = await fetch(`${navigationApi}main`)
            const resp = await fetch(`${navigationApi}`)
            const data = await resp.json()
            // console.log(data)
            setNavi(data)
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        getNavi()
    }, [])

    return (
        <SiteContext.Provider
            value={{
                navIsOpen,
                setNavIsOpen,
                toggleNav,
                openNav,
                closeNav,
                navi,
                error,
                modalIsOpen,
                setModalIsOpen,
                toggleModal,
                openModal,
                closeModal,
                modal,
                setModal,
                modalImage,
                // token,
            }}>
            {children}
        </SiteContext.Provider>
    )
}

export const useSiteContext = () => {
    return useContext(SiteContext)
}
