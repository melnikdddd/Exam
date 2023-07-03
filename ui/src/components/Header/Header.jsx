import {NavLink} from "react-router-dom";
import styles from "./header.module.scss"
import Container from "../Wrapper/Container/Container";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../store/slices/AuthSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {faBell} from "@fortawesome/free-solid-svg-icons/faBell";
import {useEffect, useState} from "react";
import ProfileOptions from "../Card/ProfileOptions";
import {selectUserData} from "../../store/slices/UserDataSlice";

function Header() {
    const isAuth = useSelector(selectIsAuth);
    const userData = useSelector(selectUserData);
    const [showProfileOptions, setShowProfileOptions] = useState(false);

    useEffect(() => {
        setShowProfileOptions(false);
    },[]);


    const handleProfileClick = () =>{
        setShowProfileOptions(!showProfileOptions);
    }


    return (
        <header className={styles.header} >
           <Container>
               <div className={styles.nav}>
                        <div className="nav-logo">
                            <NavLink to={"/home"} className={styles.logo}>iMarketPlace</NavLink>
                        </div>
                   <div className={styles.navItems}>
                       <NavLink to={"/market"} className={styles.products}>Market</NavLink>
                   </div>
                   <div className={styles.navItems}>
                       <NavLink to={"/contacts"} className={styles.navItem}>Contacts</NavLink>
                       <NavLink to={"/help"} className={styles.navItem}>Help</NavLink>
                   </div>


                       {
                           isAuth === true ?
                               <div className={"flex justify-around items-center" + `${styles.navItem} ${styles.authNav}`}>
                                   <FontAwesomeIcon icon={faUser} className={"h-5 hover:bg-lime-600 hover:text-white transition-colors p-2 rounded cursor-pointer"} onClick={handleProfileClick}/>
                                   <FontAwesomeIcon icon={faBell} id={"notificationButton"} className={"h-5 hover:bg-purple-700 hover:text-white transition-colors p-2 rounded cursor-pointer"}/>
                                   {showProfileOptions &&
                                       <ProfileOptions userData={userData} />
                                   }
                               </div>
                               :  <NavLink to={"/auth/login"} className={styles.login}>Login</NavLink>
                       }

               </div>
           </Container>
        </header>
    );
}

export default Header;