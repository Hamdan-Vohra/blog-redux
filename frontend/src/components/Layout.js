import { Outlet } from "react-router-dom";

import Header from './Header'
import Footer from './Footer'

const Layout = ()=> {
    return (
        <>
            <Header title={'Blogs'}/>
            <main className="App">
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default Layout;