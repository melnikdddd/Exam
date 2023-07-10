import UserAvatar from "../../components/Images/UserAvatar";
import {logout} from "../../utils/Auth/authFunctions";
import {clearToken, selectIsAuth} from "../../store/slices/AuthSlice";
import {clearUserData, selectUserData} from "../../store/slices/UserDataSlice";
import {useDispatch, useSelector} from "react-redux";
import BackGround from "../../components/Wrapper/BackGround/BackGround";
import ProfileCard from "../../components/Card/ProfileCard";
import styles from "./UserPofile.module.scss"
import Container from "../../components/Wrapper/Container/Container";

import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {fetchGet} from "../../utils/Axios/functions";
import CenterWrapper from "../../components/Wrapper/CenterWrapper/CenterWrapper";
import LoadingBlock from "../../components/Loading/LoadingBlock";
import {decodeBase64Image} from "../../components/Images/utils";
import {NavLink} from "react-router-dom";
import LogoutButton from "../../components/Buttons/LogoutButton";
import moment from "moment";
import UserProfileData from "./UserProfileData";
import ProductsCard from "../../components/Products/ProductsCard";

function UserProfile(props) {
    const isAuth = useSelector(selectIsAuth);
    const {id} = useParams();

    const [userData, setUserData] = useState(useSelector(selectUserData));
    const [products, setProducts] = useState([]);

    const [isLoading,setIsLoading] = useState(false);
    const [isProfile, setIsProfile] = useState(true);

    const isOwner = isAuth && id === userData._id;

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
    const handleTabsProfileClick = (event)=>{
        setIsProfile(true);
    }
    const handleTabsProductsClick = (event)=>{
        setIsProfile(false);
    }

    if (isLoading){
        return (
             <BackGround background={"radial-gradient(circle, rgba(174,238,214,1) 0%, rgba(148,187,233,1) 100%)"}>
            <Container className={"pt-6"}>
                <div className={"w-full"}>
                  <ul className={styles.tabs}>
                      <li className={`${styles.tabsItem} ${styles.left} 
                      ${isProfile ? styles.tabsActive : ''}`}
                      onClick={isProfile ? ()=>{} : handleTabsProfileClick}>
                          Profile
                      </li>
                      <li className={`${styles.tabsItem} ${styles.right} 
                      ${!isProfile ? styles.tabsActive : ''}`}
                          onClick={!isProfile ? ()=>{} : handleTabsProductsClick}>
                          Products
                      </li>
                  </ul>
                    <ProfileCard className={"rounded-none rounded-b-lg w-full border-none bg-white bg-opacity-40"}>
                        {isProfile ? <UserProfileData userData={userData} isOwner={isOwner}/> : <ProductsCard/>}
                    </ProfileCard>
                </div>
            </Container>
        </BackGround>
        );
    }
    return <CenterWrapper>
        <LoadingBlock className={"h-40 mt-40"}/>
    </CenterWrapper>

}





export default UserProfile;