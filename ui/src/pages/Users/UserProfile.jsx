import UserAvatar from "../../components/Images/UserAvatar";
import {logout} from "../../utils/Auth/authFunctions";
import {clearToken, selectIsAuth} from "../../store/slices/AuthSlice";
import {clearUserData, selectUserData} from "../../store/slices/UserDataSlice";
import {useDispatch, useSelector} from "react-redux";
import BackGround from "../../components/Wrapper/BackGround/BackGround";
import ProfileCard from "../../components/Card/ProfileCard";
import styles from "./UserPofile.module.scss"
import Container from "../../components/Wrapper/Container/Container";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faEllipsisVertical,
    faThumbsDown,
    faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {fetchGet} from "../../utils/Axios/functions";
import CenterWrapper from "../../components/Wrapper/CenterWrapper/CenterWrapper";
import LoadingBlock from "../../components/Loading/LoadingBlock";
import {set} from "react-hook-form";
import {decodeBase64Image} from "../../components/Images/utils";

function UserProfile(props) {
    const isAuth = useSelector(selectIsAuth);
    const {id} = useParams();

    const [userData, setUserData] = useState(useSelector(selectUserData));
    const [isOwner, setIsOwner] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);


    useEffect(()=>{
        const getUserData = async (id) =>{
            const {data} = await fetchGet(`users/${id}`);

            const {userAvatar, ...uData} = data.user;

            const imageData = data.userAvatar?.data || '';
            const ext = data.userAvatar?.ext || '';

            uData.userAvatar = decodeBase64Image(imageData, ext);

            setUserData(uData);
            setProducts(data.products)
            setIsOwner(false);

            setIsLoading(true);
        }
        if (!isAuth){
            getUserData(id);
        }else{
           setIsOwner(true)
        }
    },[])



    const dispatch = useDispatch();
    const handleLogoutClick  = () =>{
        logout(dispatch, clearToken, clearUserData);
    }

    if (isLoading){
        return (
             <BackGround background={"radial-gradient(circle, rgba(174,238,214,1) 0%, rgba(148,187,233,1) 100%)"}>
            <Container className={"pt-6"}>
                <ProfileCard className={styles.profileCard}>
                    <div className="flex border-r border-gray-200 h-full flex-col w-1/5 items-center px-6">
                        <UserAvatar className={"h-36 w-36"} image={userData.userAvatar} isOwner={isOwner}/>
                        <div className={"flex w-full justify-around items-center text-xl px-3 mt-3"}>
                            <span>{userData.firstname}</span>
                            <span>{userData.lastname}</span>
                        </div>
                        <div>
                            <span>Offline <FontAwesomeIcon icon={faCircle} className={"text-gray-400"}/></span>
                        </div>
                        <div className={"my-3"}>
                            {userData.userStatus && <span>{userData.userStatus}</span>}
                        </div>
                        <div className={"flex justify-between w-full mt-3 items-center"}>
                            <button className={"text-lg bg-blue-500 text-white p-1 rounded cursor-pointer hover:bg-blue-600 transition-colors"}>
                                Message
                            </button>
                            <button><FontAwesomeIcon icon={faEllipsisVertical} className={"h-6 cursor-pointer hover:text-blue-600 transition-colors"}/></button>
                        </div>
                        {userData.aboutUser &&
                            <div>
                                <p className={"text-xl"}>About me:</p>
                                <p>{userData.aboutUser}</p>
                            </div>
                        }

                        <div className={"flex w-full mt-4 items-center"}>
                            <button className={styles.ratingButton + " " + styles.left}>
                                <FontAwesomeIcon icon={faThumbsUp} className={"h-5"}/>
                                <span className={"text-xl"}>{userData.rating.likes}</span>
                            </button>
                            <button className={styles.ratingButton + " " + styles.right}>
                                <FontAwesomeIcon icon={faThumbsDown} className={"h-5"}/>
                                <span className={"text-xl"}>{userData.rating.dislikes}</span>
                            </button>
                        </div>
                    </div>
                    <div className="userPosts">

                    </div>

                </ProfileCard>
            </Container>
        </BackGround>
        );
    }
    return <CenterWrapper>
        <LoadingBlock className={"h-40 mt-40"}/>
    </CenterWrapper>

}





export default UserProfile;