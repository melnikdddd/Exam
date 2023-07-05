import UserAvatar from "../../components/Images/DecodedImage";
import {logout} from "../../utils/Auth/authFunctions";
import {clearToken} from "../../store/slices/AuthSlice";
import {clearUserData, selectUserData} from "../../store/slices/UserDataSlice";
import {useDispatch, useSelector} from "react-redux";
import BackGround from "../../components/Wrapper/BackGround/BackGround";
import ProfileCard from "../../components/Card/ProfileCard";
import styles from "./UserPofile.module.scss"
import Container from "../../components/Wrapper/Container/Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faEllipsisVertical, faShare, faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {useParams} from "react-router";
function UserProfile(props) {
    const {id} = useParams();
    const userData = useSelector(selectUserData);
    const dispatch = useDispatch();

    const isOwner = userData._id === id;

    const handleLogoutClick  = () =>{
        logout(dispatch, clearToken, clearUserData);
    }

    return (
        <BackGround background={"radial-gradient(circle, rgba(174,238,214,1) 0%, rgba(148,187,233,1) 100%)"}>
            <Container className={"pt-6"}>
                <ProfileCard className={" " + styles.profileCard}>
                    <div className={"flex mt-36 justify-between items-center"}>
                            <div>
                                <UserAvatar className={"h-44 w-44 border-8 border-white rounded-full"}/>
                             <div className={"text-xl flex justify-around mt-3 px-4"}>
                                <span className={""}>{userData.lastname}</span>
                                <span className={""}>{userData.firstname}</span>
                             </div>

                            </div>
                            <div>
                                <FontAwesomeIcon icon={faEllipsisVertical} className={"h-9 text-gray-600 cursor-pointer"}/>
                            </div>
                        </div>
                    <div className={"mt-5"}>
                        <ul className={"flex flex-row text-gray-600"}>
                            {userData.email && <li>{userData.email}</li>}
                            {userData.email &&
                                    <li className={"ml-3 flex items-center"}>
                                        <FontAwesomeIcon icon={faCircle} className={"text-gray-400 h-2"}/>
                                        <span className={"ml-2"}>{"+380686243722"}</span>
                                    </li>
                            }
                        </ul>
                    </div>
                    <div className={"mt-4 flex flex-row justify-between items-center"}>
                        <div>
                            <button className={"bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"}>Message</button>
                            <button className={"shadow-md p-2 rounded cursor-pointer ml-5 border border-gray-200 hover:bg-gray-300 transition-colors"}>
                                <FontAwesomeIcon icon={faShare} className={"mr-2"}/>
                                Share Profile
                            </button>
                        </div>
                        <div className={"flex flex-row justify-between items-center"}>
                            <FontAwesomeIcon icon={faThumbsUp} className={"h-7 mr-1"}/><span className={"text-lg mr-3"}>{userData.rating.likes}</span>
                            <FontAwesomeIcon icon={faThumbsDown} className={"h-7 mr-1"}/> <span className={"text-lg"}>{userData.rating.dislikes}</span>
                        </div>
                    </div>
                </ProfileCard>
            </Container>
        </BackGround>
    );
}

export default UserProfile;