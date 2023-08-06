import Header from "../Header/Header";
import {Outlet} from "react-router";
import Footer from "../Footer/Footer";
import {useLocation} from "react-router-dom";
import styles from "./Layout.module.scss"
import NotificationContainer from "../Notification/NotificatrionContainer/NotificationContainer";
import {useEffect, useState} from "react";
function Layout(){
    const location = useLocation();

    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

    const toggleNotification = () =>{
        setIsNotificationEnabled(!isNotificationEnabled)
    }

    useEffect(() => {
        setIsNotificationEnabled(false);

    }, [location]);


    return (
        <div className={styles.wrapper}>
            <Header toggleNotification={toggleNotification} isNotificationEnabled={isNotificationEnabled}/>
            <main>
                {isNotificationEnabled &&
                    <NotificationContainer />
                }

                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default Layout;