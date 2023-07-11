import UserAvatar from "../../components/Images/UserAvatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBan,
    faBookmark,
    faCircle,
    faCircleExclamation,
    faEllipsisVertical,
    faGear
} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import LogoutButton from "../../components/Buttons/LogoutButton/LogoutButton";
import moment from "moment";
import styles from "./UserPofile.module.scss";
import RatingButtons from "../../components/Buttons/RatingButton/RatingButtons";
import React, {useEffect, useState} from "react";

function UserProfileData(props) {
    const {userData, isOwner, isAuth} = props;

    const [showProfileOptions, setShowProfileOptions] = useState(false);

    useEffect(()=>{
       setShowProfileOptions(false);
    },[]);

    const handleShowOptionsClick = ()=>{
        setShowProfileOptions(!showProfileOptions);
    }

    const handleProfileOptionsOnMouseLeave = () =>{
        setShowProfileOptions(false);
    }

    return (
        <div className={"flex"}>
            <div className={"border rounded-lg flex-col px-6 pt-6 pb-4 bg-white shadow-md items-center"} style={{height: "360px"}}>
                <UserAvatar image={userData.userAvatar} className={"w-full h-44 "} isOwner={isOwner}/>
                <div className={"w-full flex justify-between items-center p-3 px-6"} style={{minWidth: "180px"}}>
                    <span className={"text-lg"}>{userData.firstname}</span>
                    <span className={"text-lg"}>{userData.lastname}</span>
                </div>
                <div className={"text-center mb-3"}>
                    <span className={"text-base"}>
                        Offline
                        <FontAwesomeIcon icon={faCircle} className={"text-slate-300 ml-2"}/>
                    </span>
                </div>
                <div className={"flex items-center justify-between mt-3"}>
                    {isOwner ?
                        <>
                        <NavLink to={`/users/${userData._id}/setting`} className={"bg-gray-300 p-2 rounded hover:bg-gray-400 transition-colors cursor-pointer"}>
                            Setting
                            <FontAwesomeIcon icon={faGear} className={"ml-1"}/>
                        </NavLink>
                            <LogoutButton className={"p-2 ml-2"}/>
                        </>
                        :
                        <>
                            <button className={"bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors cursor-pointer"}>Message</button>
                            <FontAwesomeIcon icon={faEllipsisVertical}
                                             className={`h-6 hover:text-blue-600 transition-colors cursor-pointer ${showProfileOptions ? "text-blue-600" : ''}`}
                                             onClick={handleShowOptionsClick}
                            />
                            {showProfileOptions &&
                                <ProfileOptions onMouseLeave={handleProfileOptionsOnMouseLeave} isAuth={isAuth}/>
                            }
                        </>
                    }
                </div>
            </div>
            <div className={"bg-white shadow-md ml-2 rounded-lg w-full flex flex-col justify-between"}>
                <div className={"w-full p-4"}>
                    <p className={"text-slate-500"}>
                        Status:
                    </p>
                    <span className={"text-lg "}>
                        {userData.userStatus ? userData.userStatus : "Not indicated."}
                    </span>
                </div>
                <div className={"w-full p-4"}>
                    <p className={"text-slate-500"}>
                        Deals:
                    </p>
                    <span className={"text-lg "}>
                        Purchase: {userData.deals.purchase}
                    </span>
                    <span className={"text-lg ml-4"}>
                        Purchase: {userData.deals.sales}.
                    </span>
                </div>
                <div className={"w-full p-4"}>
                    <p className={"text-slate-500"}>
                        About me:
                    </p>
                    <span className={"text-lg "}>
                        {userData.aboutUser ? userData.aboutUser : 'Not indicated.'}
                    </span>
                </div>
                <div className={"w-full border-t border-gray-300 p-4 flex justify-between"}>
                    <div>
                        <p className={"text-slate-600 text-lg"}>Last active:</p>
                        <span className="text-slate-900 text-lg">
                            21-05-2023
                        </span>
                    </div>
                    <RatingButtons rating={userData.rating} className={''} isDisabled={isOwner}/>
                    <div>
                        <p className={"text-slate-600 text-lg"}>Since:</p>
                        <span className="text-slate-900 text-lg">
                        {moment(userData.createdAt).format("DD-MM-YYYY")}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProfileOptions(props){
    const isAuth = props.isAuth;
    const handleFavoriteClick = ()=>{

    }
    const handleBlockClick = ()=>{

    }
    const handleReportClick = ()=>{

    }

    return (
        <ul className={styles.options}  onMouseLeave={props.onMouseLeave}>
            <li className={`${styles.optionItem} rounded-t-lg`}>
                <span>To favorites</span>
                <FontAwesomeIcon icon={faBookmark}/>
            </li>
            <hr/>
            <li className={`${styles.optionItem} `}>
                <span>Block</span>
                <FontAwesomeIcon icon={faBan}/>
            </li>
            <hr/>
            <li className={`${styles.optionItem}  rounded-b-lg`}>
                <span>Report</span>
                <FontAwesomeIcon icon={faCircleExclamation} />
            </li>
        </ul>
    )
}

export default UserProfileData;