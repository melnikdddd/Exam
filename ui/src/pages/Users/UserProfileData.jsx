import UserAvatar from "../../components/Images/UserAvatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faEllipsisVertical, faGear} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";
import LogoutButton from "../../components/Buttons/LogoutButton/LogoutButton";
import moment from "moment";
import RatingButtons from "../../components/Buttons/RatingButton/RatingButtons";
import React, {useEffect, useState} from "react";
import ProfileOptions from "./ProfileOptions";
import {useParams} from "react-router";

function UserProfileData(props) {
    const {user, isOwner, isAuth, owner, isBlocked, setIsBlocked} = props;

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
                <UserAvatar image={user.userAvatar} className={"w-full h-44 "} isOwner={isOwner}/>
                <div className={"w-full flex justify-between items-center p-3 px-6"} style={{minWidth: "180px"}}>
                    <span className={"text-lg"}>{user.firstname}</span>
                    <span className={"text-lg"}>{user.lastname}</span>
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
                        <NavLink to={`/users/${user._id}/setting`} className={"bg-gray-300 p-2 rounded hover:bg-gray-400 transition-colors cursor-pointer"}>
                            Setting
                            <FontAwesomeIcon icon={faGear} className={"ml-1"}/>
                        </NavLink>
                            <LogoutButton className={"p-2 ml-2"}/>
                        </>
                        :
                        <>
                            <button className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors cursor-pointer
                            disabled:bg-gray-100 disabled:text-gray-600 disabled:hover:none disabled:cursor-default`}
                            disabled={isBlocked}>
                                Message
                            </button>
                            <FontAwesomeIcon icon={faEllipsisVertical}
                                             className={`h-6 hover:text-blue-600 transition-colors cursor-pointer ${showProfileOptions ? "text-blue-600" : ''}`}
                                             onClick={handleShowOptionsClick}
                            />
                            {showProfileOptions &&
                                <ProfileOptions onMouseLeave={handleProfileOptionsOnMouseLeave}
                                                isAuth={isAuth}
                                                user={user}
                                                owner={owner}
                                                isBlocked={isBlocked}
                                                setIsBlocked={setIsBlocked}
                                />
                            }
                        </>
                    }
                </div>
            </div>
            {isBlocked ?
                <div className={"bg-white ml-2 shadow-md rounded-lg w-full flex flex-col items-center justify-center"}>
                    <h1 className={"text-center text-2xl"}>{user.firstname} is blocked.</h1>
                </div>
                :
                <div className={"bg-white shadow-md ml-2 rounded-lg w-full flex flex-col justify-between"}>
                    <div className={"w-full p-4"}>
                        <p className={"text-slate-500"}>
                            Status:
                        </p>
                        <span className={"text-lg "}>
                        {user.userStatus ? user.userStatus : "Not indicated."}
                    </span>
                    </div>
                    <div className={"w-full p-4"}>
                        <p className={"text-slate-500"}>
                            Deals:
                        </p>
                        <span className={"text-lg "}>
                        Purchase: {user.deals.purchase}
                    </span>
                        <span className={"text-lg ml-4"}>
                        Purchase: {user.deals.sales}.
                    </span>
                    </div>
                    <div className={"w-full p-4"}>
                        <p className={"text-slate-500"}>
                            About me:
                        </p>
                        <span className={"text-lg "}>
                        {user.aboutUser ? user.aboutUser : 'Not indicated.'}
                    </span>
                    </div>
                    <div className={"w-full border-t border-gray-300 p-4 flex justify-between"}>
                        <div>
                            <p className={"text-slate-600 text-lg"}>Last active:</p>
                            <span className="text-slate-900 text-lg">
                            21-05-2023
                        </span>
                        </div>
                        <RatingButtons rateObj={user} isAuth={isAuth} isDisabled={isOwner} ownerId={owner._id} entity={`users`}/>
                        <div>
                            <p className={"text-slate-600 text-lg"}>Since:</p>
                            <span className="text-slate-900 text-lg">
                        {moment(user.createdAt).format("DD-MM-YYYY")}
                        </span>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}



export default UserProfileData;