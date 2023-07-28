import {useSelector} from "react-redux";
import {selectUserImage} from "../../store/slices/UserDataSlice";
import {selectIsAuth} from "../../store/slices/AuthSlice";
import {useEffect, useState} from "react";


const UserAvatar = (props) => {

    const {isChanged, image} = props;



    return <div className={props.className} onClick={props.onClick}>
        <img src={image} alt={"userImage"}
             className={`w-full h-full rounded-full ${isChanged ? ' cursor-pointer' : ''}`}/>
    </div>


}

export default UserAvatar;