import {NavLink} from "react-router-dom";
import "./header.scss"
function Header() {
    return (
        <header>
           <div className="container">
               <div className="nav">
                   <div className="nav-logo">
                       <h2>Header</h2>
                   </div>
                   <div className="nav-items">
                       <NavLink to={"/"}>Home</NavLink>
                       <NavLink to={"/products"}>Products</NavLink>
                   </div>
                   <div className="nav-items">
                       <NavLink to={"/contacts"}>Contacts and help</NavLink>
                       <NavLink to={"/terms"}>Privacy policy</NavLink>
                   </div>
                   <div className="nav-auth">
                       <NavLink to={"/auth/choose"}>Login</NavLink>
                   </div>
               </div>
           </div>
        </header>
    );
}

export default Header;