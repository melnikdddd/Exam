import {Link, NavLink, useLocation} from "react-router-dom";
import styles from "./header.module.scss"
import Container from "../Wrapper/Container/Container";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../store/slices/AuthSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {faBell} from "@fortawesome/free-solid-svg-icons/faBell";
import {selectUserData} from "../../store/slices/UserDataSlice";
import {faBagShopping} from "@fortawesome/free-solid-svg-icons";

function Header() {
    const location = useLocation()
    const isAuth = useSelector(selectIsAuth);
    const userData = useSelector(selectUserData);

    return (
        <header className={styles.header} >
           <Container>
               <div className={styles.nav}>
                        <div className="flex justify-between items-center ">
                            <NavLink to={"/home"} className={styles.logo}>iMarketPlace</NavLink>
                            <div className={styles.navItems}>
                                <NavLink to={"/market"} className={styles.navItem}>Market</NavLink>
                            </div>
                        </div>
                       {
                           isAuth === true ?
                               <div className={"flex justify-around items-center" + `${styles.navItem} `}>
                                   {
                                       location.pathname !== `/users/${userData._id}` &&
                                       (
                                           <>
                                             <Link to={`users/${userData._id}`} state={{isProfile: true}}>
                                                  <FontAwesomeIcon icon={faUser} className={styles.navigationIcon} />
                                             </Link>

                                               <Link to={`users/${userData._id}`} state={{isProfile: false}}>
                                                   <FontAwesomeIcon icon={faBagShopping} className={styles.navigationIcon}/>
                                               </Link>
                                           </>
                                       )

                                   }
                                   <FontAwesomeIcon icon={faBell} id={"notificationButton"} className={styles.navigationIcon}/>
                               </div>
                               :  <Link to={"/auth/login"} className={styles.login}>Login</Link>
                       }

               </div>
           </Container>
        </header>
    );
}

export default Header;