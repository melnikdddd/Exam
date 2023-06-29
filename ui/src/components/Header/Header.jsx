import {NavLink} from "react-router-dom";
import styles from "./header.module.scss"
import Container from "../Wrapper/Container/Container";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../store/slices/AuthSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";

function Header() {
    const isAuth = useSelector(selectIsAuth);
    
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
                   <div className="nav-auth">
                       {
                           isAuth === true ? 
                               <NavLink to={`users/`}><FontAwesomeIcon icon={faUser}/></NavLink>
                               :  <NavLink to={"/auth/login"} className={styles.login}>Login</NavLink>
                       }
                   </div>
               </div>
           </Container>
        </header>
    );
}

export default Header;