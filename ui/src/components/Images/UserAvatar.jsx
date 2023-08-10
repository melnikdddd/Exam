import {useSelector} from "react-redux";
import {selectUserImage} from "../../store/slices/UserDataSlice";
import {selectIsAuth} from "../../store/slices/AuthSlice";
import {useEffect, useState} from "react";
import RemoveImageButton from "../Buttons/RemoveImageButton/RemoveImage";


const UserAvatar = (props) => {

    const {isChanged, image} = props;
    const {setIsClicked, isClicked} = props;

    const [thisImage, setThisImage] = useState(image);

    useEffect(()=>{
        setThisImage(image)
    },[image])


    return <div className={`rounded-full ${props.className} w-44 h-44`}>
        {isChanged && <RemoveImageButton setIsClicked={setIsClicked} isClicked={isClicked}/> }
        <img src={thisImage} alt={"userImage"} onClick={props.onClick}
             className={`w-full h-full rounded-full ${isChanged ? ' cursor-pointer' : ''}`}/>
    </div>


}

export default UserAvatar;