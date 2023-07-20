import {selectIsAuth} from "../../store/slices/AuthSlice";
import {selectProducts, selectUserData} from "../../store/slices/UserDataSlice";
import {useDispatch, useSelector} from "react-redux";
import BackGround from "../../components/Wrapper/BackGround/BackGround";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import styles from "./UserPofile.module.scss"
import Container from "../../components/Wrapper/Container/Container";

import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {fetchGet} from "../../utils/Axios/functions";
import CenterWrapper from "../../components/Wrapper/CenterWrapper/CenterWrapper";
import LoadingBlock from "../../components/Loading/LoadingBlock";
import {decodeBase64Image} from "../../components/Images/utils";

import UserProfileData from "./UserProfileData";
import ProfileProducts from "../../components/Products/ProfileProducts/ProfileProducts";
import {useNavigate, useLocation} from "react-router-dom";

function UserProfile(props) {
    const isAuth = useSelector(selectIsAuth);


    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const owner = useSelector(selectUserData);
    const ownerProducts = useSelector(selectProducts);

    const [user, setUser] = useState(null);

    const [products, setProducts] = useState(null);
    const [isOwner,setIsOwner] = useState(null)

    const [isBlocked, setIsBlocked] = useState(null);
    const [isLoading,setIsLoading] = useState(false);


    const [isProfile, setIsProfile] = useState(location.state?.isProfile ?? true);


    useEffect(()=>{
        const getUserData = async (id) =>{
            const {data} = await fetchGet(`users/${id}`);

            if (!data){
                navigate("/error");
                return;
            }

            const {userAvatar, ...uData} = data.user;

            const imageData = userAvatar?.data?.data || '';
            const image = imageData.length === 0  || !imageData ? '' : imageData;
            const ext = data.userAvatar?.ext || '';

            uData.userAvatar = decodeBase64Image(image, ext);

            setIsOwner(false);
            setUser(uData);
            setProducts(data.products)
            setIsBlocked(isAuth ? owner.blockedUsers.includes(id)  : false);
            setIsLoading(true);
        }

        if (isAuth && owner._id === id){

            setIsOwner(true);
            setUser(owner);
            setProducts(ownerProducts);
            setIsLoading(true);
            return;
        }

        getUserData(id);

    },[id])

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
                        {isProfile ?
                            <UserProfileData user={user} isOwner={isOwner} isAuth={isAuth} owner={owner}
                            setIsBlocked={setIsBlocked} isBlocked={isBlocked}/>
                            :
                            <ProfileProducts products={products} isOwner={isOwner} isBlocked={isBlocked}/>}
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