import {useSelector} from "react-redux";
import {selectUserImage} from "../../store/slices/UserDataSlice";
import {selectIsAuth} from "../../store/slices/AuthSlice";
import {useEffect, useState} from "react";
import RemoveImageButton from "../Buttons/RemoveImageButton/RemoveImage";
import {decodeBase64Image} from "./utils";


const UserAvatar = (props) => {

    const {isChanged, image} = props;
    const {setIsClicked, isClicked} = props;

    const {isImageNeedDecoding} = props;

    const [thisImage, setThisImage] = useState(image);

    useEffect(()=>{
        setThisImage(image)
    },[image])

    if (isImageNeedDecoding){
        setThisImage(decodeBase64Image(image).userImage)
    }


    return <div className={`rounded-full  ${props.className}`}>
        {isChanged && <RemoveImageButton setIsClicked={setIsClicked} isClicked={isClicked}/> }
        <img src={thisImage} alt={"userImage"} onClick={props.onClick}
             className={` w-full h-full rounded-full ${isChanged ? ' cursor-pointer' : ''}`}/>
    </div>


}

export default UserAvatar;