import Header from "../Header/Header";
import {Outlet} from "react-router";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.scss"
function Layout(){
    return (
        <div className={styles.wrapper}>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default Layout;