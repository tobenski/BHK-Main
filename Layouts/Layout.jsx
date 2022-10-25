import Footer from '../Components/Common/Footer/Footer'
import Header from '../Components/Common/Header/Header'
import Menu from '../Components/Common/Header/Menu'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className='innerContent'>{children}</main>
            <Footer />
            <Menu />
        </>
    )
}

export default Layout
