import {useSelector} from "react-redux";
import {selectUserImage} from "../../store/slices/UserDataSlice";
import {selectIsAuth} from "../../store/slices/AuthSlice";
import {useEffect, useState} from "react";



const UserAvatar = (props) =>{

    const {isChanged, image} = props;

    const [imageState, setImageState] = useState(image);

    useEffect(() => {
        setImageState(image)
    }, [image]);



    if (isChanged){
        return <div className={props.className} onClick={props.onClick}>
            <img src={imageState} alt={"userImage"} className={"w-full h-full rounded-full cursor-pointer"}/>
        </div>
    }

    return <div className={props.className} >
        <img src={imageState} alt={"userImage"} className={"w-full h-full rounded-full"}/>
    </div>


}

export default UserAvatar;