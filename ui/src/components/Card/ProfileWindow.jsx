import styles from "./ProfileOptions.module.scss"
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import UserAvatar from "../Images/UserAvatar";
import LogoutButton from "../Buttons/LogoutButton";



function ProfileWindow(props) {
    const userData = props.userData;

    return (

        <div className={styles.profileOptions}>
            <NavLink to={`users/${userData._id}`}>
                <UserAvatar className="w-16 h-16 rounded-full" isOwner={true}/>
            </NavLink>
            <div>
            <span>{userData.firstname}</span> <span>{userData.lastname}</span>
            </div>
            <LogoutButton className="mt-3"/>
        </div>
    );
}

export default ProfileWindow;