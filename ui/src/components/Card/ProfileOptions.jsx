import styles from "./ProfileOptions.module.scss"
import {NavLink} from "react-router-dom";
import {logout} from "../../utils/Auth/authFunctions";
import {clearToken} from "../../store/slices/AuthSlice";
import {useDispatch} from "react-redux";
import {clearUserData} from "../../store/slices/UserDataSlice"
import {useEffect} from "react";
import DecodedImageFromBase64 from "../Images/DecodedImage";



function ProfileOptions(props) {
    const dispatch = useDispatch();
    const handleLogoutClick  = () =>{
        logout(dispatch, clearToken, clearUserData);
    }

    const userData = props.userData;

    return (
        <div className={styles.profileOptions}>
            <NavLink to={`users/${userData._id}`}>
                <DecodedImageFromBase64 data={userData.userAvatar.data} ext={userData.userAvatar.ext} className="w-16 h-16 rounded-full"/>
            </NavLink>
            <div>
            <span>{userData.firstname}</span> <span>{userData.lastname}</span>
            </div>
            <button className={"py-1 px-2 hover:bg-red-400 hover:text-black transition-colors rounded cursor-pointer bg-red-500"} onClick={handleLogoutClick}>Logout</button>
        </div>
    );
}

export default ProfileOptions;