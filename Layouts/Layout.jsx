import Footer from '../Components/Common/Footer/Footer'
import Header from '../Components/Common/Header/Header'
import Menu from '../Components/Common/Header/Menu_new'
import Modal from '../Components/Common/Modal/Modal'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className='innerContent'>{children}</main>
            <Footer />
            <Menu />
            <Modal />
        </>
    )
}

export default Layout
