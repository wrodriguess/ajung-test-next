import Head from 'next/head'
import Navbar from './Navbar'

function Layout({children}){
    return(
        <div className="container-layout">
            <Head>
                <title>Ajung Solution - NextJS</title>
                <meta name="description" content="Front-end test with nextjs" />
            </Head>

            <Navbar/>

            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout