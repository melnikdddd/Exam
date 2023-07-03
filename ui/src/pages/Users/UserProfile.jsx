import UserAvatar from "../../components/Images/DecodedImage";
import {logout} from "../../utils/Auth/authFunctions";
import {clearToken} from "../../store/slices/AuthSlice";
import {clearUserData, selectUserData} from "../../store/slices/UserDataSlice";
import {useDispatch, useSelector} from "react-redux";
import CenterWrapper from "../../components/Wrapper/CenterWrapper/CenterWrapper";
import BackGround from "../../components/Wrapper/BackGround/BackGround";
import ProfileCard from "../../components/Card/ProfileCard";
import styles from "./UserPofile.module.scss"
function UserProfile(props) {
    const userData = useSelector(selectUserData);
    const dispatch = useDispatch();
    const handleLogoutClick  = () =>{
        logout(dispatch, clearToken, clearUserData);
    }

    return (
        <BackGround background={"radial-gradient(circle, rgba(174,238,214,1) 0%, rgba(148,187,233,1) 100%)"}>
            <CenterWrapper>
                <ProfileCard className={styles.profileCard}>
                    <div>
                        <UserAvatar className={"h-30"}/>
                    </div>
                    <div className={"flex justify-between items-center text-2xl"}>
                        {userData.firstname} {userData.lastname}
                    </div>
                    <div>
                        <p>Phone number: <span>{userData.phoneNumber || "Not indicated"}</span></p>
                    </div>
                    <div>
                        <p>Email: <span>{userData.email}</span></p>
                    </div>
                    <div>
                        <p>About you: <span>{userData.aboutUser || "Not indicated"}</span></p>
                    </div>
                    <div className={"flex flex-row justify-around"}>
                        <button className={"py-1 mt-3 px-2 hover:bg-gray-400 hover:text-black transition-colors rounded cursor-pointer bg-gray-500"}>Security setting</button>
                        <button className={"py-1 mt-3 px-2 hover:bg-blue-400 hover:text-black transition-colors rounded cursor-pointer bg-blue-500"}>Change profile</button>
                    </div>
                    <div>
                        <button className={"py-1 mt-3 px-2 hover:bg-red-400 hover:text-black transition-colors rounded cursor-pointer bg-red-500"} onClick={handleLogoutClick}>Logout</button>
                    </div>
                </ProfileCard>
            </CenterWrapper>
        </BackGround>
    );
}

export default UserProfile;