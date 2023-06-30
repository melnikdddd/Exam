import styles from "./ProfileOptions.module.scss"
import {NavLink} from "react-router-dom";
import {logout} from "../../utils/Auth/authFunctions";
import {clearToken} from "../../store/slices/AuthSlice";
import {useDispatch} from "react-redux";
import {clearUserData} from "../../store/slices/UserDataSlice"
import {useEffect} from "react";



function ProfileOptions(props) {
    const dispatch = useDispatch();
    const handleLogoutClick  = () =>{
        logout(dispatch, clearToken, clearUserData);
    }



    return (
        <div className={styles.profileOptions}>
            <img className="w-15 h-15 rounded-full" src={props.userImage} alt="userAvatar"/>
            <div>
            <span>{props.firstname}</span> <span>{props.lastname}</span>
            </div>
            <NavLink to={`users/${props.id}`}>My profile</NavLink>
            <button className={"py-1 px-2 hover:bg-red-400 hover:text-black transition-colors rounded cursor-pointer bg-red-500"} onClick={handleLogoutClick}>Logout</button>
        </div>
    );
}

export default ProfileOptions;