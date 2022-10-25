import Layout from '../Layouts/Layout'
import '../styles/reset.scss'
import '../styles/variables.scss'
import '../styles/globals.scss'
import '../styles/icons.scss'
import { SiteProvider } from '../contexts/siteContext'

function MyApp({ Component, pageProps }) {
    return (
        <SiteProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SiteProvider>
    )
}

export default MyApp
