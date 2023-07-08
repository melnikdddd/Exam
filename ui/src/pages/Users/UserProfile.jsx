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
    faEllipsisVertical, faGear,
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
import {NavLink} from "react-router-dom";
import LogoutButton from "../../components/Buttons/LogoutButton";
import moment from "moment";

function UserProfile(props) {
    const isAuth = useSelector(selectIsAuth);
    const {id} = useParams();

    const [userData, setUserData] = useState(useSelector(selectUserData));
    const [isLoading,setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);


    useEffect(()=>{
        const getUserData = async (id) =>{
            const {data} = await fetchGet(`users/${id}`);

            const {userAvatar, ...uData} = data.user;

            const imageData = userAvatar?.data?.data || ''
            const image = imageData.length === 0  || !imageData ? '' : imageData;
            const ext = data.userAvatar?.ext || '';



            uData.userAvatar = decodeBase64Image(image, ext);

            setUserData(uData);
            setProducts(data.products)
            setIsLoading(true);

        }


        if (!isAuth){
            getUserData(id);
            return;
        }

        setIsLoading(true);
    },[])

    const handleLikeClick = () =>{

    }
    const handleDisLikeClick = () =>{

    }

    if (isLoading){
        return (
             <BackGround background={"radial-gradient(circle, rgba(174,238,214,1) 0%, rgba(148,187,233,1) 100%)"}>
            <Container className={"pt-6"}>
                <ProfileCard className={styles.profileCard}>
                    <div className="flex border-r border-gray-200 h-full flex-col w-1/4 items-center px-6">
                        <UserAvatar className={"h-36 w-36"} image={userData.userAvatar} isOwner={isAuth}/>
                        <div className={"flex w-full justify-around items-center text-xl px-3 mt-3"}>
                            <span>{userData.firstname}</span>
                            <span>{userData.lastname}</span>
                        </div>
                        <div>
                            {isAuth ?
                                <span>Online <FontAwesomeIcon icon={faCircle} className={"text-green-700"}/></span>
                                :
                                <span>Offline <FontAwesomeIcon icon={faCircle} className={"text-gray-400"}/></span>
                            }

                        </div>
                        <div className={"my-3"}>
                            {userData.userStatus && <span>{userData.userStatus}</span>}
                        </div>
                        <hr className={"bg-gray-300 w-full my-1"}/>
                        <div className={"flex justify-between w-full items-center"}>
                            {!isAuth  &&
                                <>
                                <button className={"text-lg bg-blue-500 text-white p-1 rounded cursor-pointer hover:bg-blue-600 transition-colors"}>
                                    Message
                                </button>
                                <button><FontAwesomeIcon icon={faEllipsisVertical} className={"h-6 cursor-pointer hover:text-blue-600 transition-colors"}/></button>
                                </>
                        }
                        </div>

                        {userData.aboutUser &&
                            <>
                            <div>
                                <p className={"text-xl"}>About me:</p>
                                <p>{userData.aboutUser}</p>
                            </div>
                                <hr className={"bg-gray-300 w-full my-1"}/>
                            </>
                        }
                        <div className={"w-full"}>
                            <p className={"text-lg"}>Deals</p>
                            <div className={"flex justify-start flex-col text-base"}>
                                <span>Purchase: <span className={"font-bold"}>{userData.deals.purchase}</span></span>
                                <span>Sales: <span className={"font-bold"}>{userData.deals.purchase}</span></span>
                            </div>
                        </div>
                        <hr className={"bg-gray-300 w-full my-1"}/>
                        {!isAuth &&
                            <div>
                                <span >{userData.latestOnline}</span>
                            </div>

                        }
                        <p className={"text-lg text-gray-500 my-3"}>Since {moment(userData.createdAt).format("DD-MM-YYYY")}</p>
                        <div className={"flex w-full  items-center"}>
                            <button className={`${styles.ratingButton} ${styles.left} ${isAuth ? styles.disabled : ''}`}
                                    onClick={isAuth ? () => {} : handleDisLikeClick}>
                                <FontAwesomeIcon icon={faThumbsUp} className={"h-5"}/>
                                <span className={"text-xl"}>{userData.rating.likes}</span>
                            </button>
                            <button className={`${styles.ratingButton} ${styles.right} ${isAuth ? styles.disabled : ''}`}
                                    onClick={isAuth ? () => {} : handleDisLikeClick}>
                                <FontAwesomeIcon icon={faThumbsDown} className={"h-5"}/>
                                <span className={"text-xl"}>{userData.rating.dislikes}</span>
                            </button>
                        </div>
                        {isAuth && <hr className={"bg-gray-300 w-full my-3"}/>}

                        {isAuth &&
                            <div className="flex w-full justify-between">
                                <NavLink to={`users/${id}/edit`} className={"p-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"}>Setting <FontAwesomeIcon icon={faGear}/></NavLink>
                                <LogoutButton className={"p-2"}/>
                            </div>
                        }
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