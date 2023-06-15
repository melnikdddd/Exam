import Header from "../Header/Header";
import {Outlet} from "react-router";
import Footer from "../Footer/Footer";
import "./Layout.scss"
function Layout(){
    return (
        <>
            <Header/>
            <main>
                <div className="container">
                    <Outlet/>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Layout;