import {NavLink} from "react-router-dom";
import styles from "./header.module.scss"
import Container from "../Wrapper/Container/Container";
function Header() {
    return (
        <header className={styles.header} >
           <Container>
               <div className={styles.nav}>
                        <div className="nav-logo">
                            <NavLink to={"/"} className={styles.logo}>iMarketPlace</NavLink>
                        </div>
                   <div className={styles.navItems}>
                       <NavLink to={"/market"} className={styles.products}>Market</NavLink>
                   </div>
                   <div className={styles.navItems}>
                       <NavLink to={"/contacts"} className={styles.navItem}>Contacts</NavLink>
                       <NavLink to={"/help"} className={styles.navItem}>Help</NavLink>
                   </div>
                   <div className="nav-auth">
                        <NavLink to={"/auth/login"} className={styles.login}>Login</NavLink>
                   </div>
               </div>
           </Container>
        </header>
    );
}

export default Header;