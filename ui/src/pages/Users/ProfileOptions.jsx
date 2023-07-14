import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {fetchUpdate} from "../../utils/Axios/functions";
import {setUserData, updateValue} from "../../store/slices/UserDataSlice";
import styles from "./UserPofile.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faBookmark, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {type} from "@testing-library/user-event/dist/type";

function ProfileOptions(props){
    const {isAuth, owner, user} = props;
    const userId = user?._id;
    const ownerId = owner?._id;
    const navigate = useNavigate();

        console.log(ownerId);
        console.log(user.reports);

    const isFavoriteUser = isAuth ? owner.favoritesUsers.includes(userId)  : false;
    const isBlockedUser = isAuth ? owner.blockedUsers.includes(userId)  : false;
    const isReportedUser = isAuth ? user.reports.includes(ownerId)  : false;


    const dispatch = useDispatch();

    const [isFavorites, setIsFavorites] = useState(isFavoriteUser);
    const [isBlocked, setIsBlocked] = useState(isBlockedUser);
    const [isReported, setIsReported] = useState(isReportedUser);

    const updateOwnerList = async (listType, boolean, set) =>{

        const operation = boolean ? "remove" : "add";

        const {success} = await fetchUpdate(`/users/${owner._id}`,
            {userId: userId, listType: listType, operation: operation});
        if (!success){
            return false;
        }

        let updatedArray = [...owner[listType]];

        if (!boolean) updatedArray.push(userId);
        else  updatedArray = updatedArray.filter(element => updatedArray === userId);

        dispatch(updateValue({field: listType, value: updatedArray}))
        set(!boolean);
    }
    const handleFavoriteClick = async ()=>{
        if (isAuth){
            await updateOwnerList("favoritesUsers", isFavorites, setIsFavorites);
            return;
        }
        navigate("/auth/login", { state: {from: `/users/${userId}`}});

    }
    const handleBlockClick = async ()=>{
        if (isAuth){
            await updateOwnerList("blockedUsers", isBlocked, setIsBlocked);
            return;
        }
        navigate("/auth/login", { state: {from: `/users/${userId}`}});
    }
    const handleReportClick = async ()=>{
        if (isAuth){
            const {success} = await fetchUpdate(`/users/${userId}`,
                {userId: ownerId, listType: "reports", operation: "add"});
            if (!success){
                alert(success)
                return;
            }
            user.reports.push(ownerId);
            setIsReported(true);
            return;
        }
        navigate("/auth/login", { state: {from: `/users/${userId}`}});
    }

    return (
        <ul className={styles.options}  onMouseLeave={props.onMouseLeave}>
            <li className={`${styles.optionItem} rounded-t-lg ${styles.favorite} ${isFavorites ? styles.clicked : ''}`} onClick={handleFavoriteClick}>
                <span>To favorites</span>
                <FontAwesomeIcon icon={faBookmark}/>
            </li>
            <li className={`${styles.optionItem} ${styles.block}  ${isBlocked ? styles.clicked : ''}`} onClick={handleBlockClick}>
                <span>Block</span>
                <FontAwesomeIcon icon={faBan}/>
            </li>
            <li className={`${styles.optionItem} ${styles.report} ${isReported ? styles.clicked : ''} `} onClick={isReported ? ()=>{} : handleReportClick}>
                <span>Report</span>
                <FontAwesomeIcon icon={faCircleExclamation} />
            </li>
        </ul>
    )
}

export default ProfileOptions;