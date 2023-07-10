import {useSelector} from "react-redux";
import {selectUserImage} from "../../store/slices/UserDataSlice";
import {selectIsAuth} from "../../store/slices/AuthSlice";



const UserAvatar = (props) =>{
    const image = useSelector(selectUserImage);

    if (props.isOwner === true){
        return <div className={props.className} >
            <img src={image} alt={"userImage"} className={"w-full h-full rounded-full"}/>
        </div>
    }


    return <div className={props.className} >
        <img src={props.image} alt={"userImage"} className={"w-full h-full rounded-full"}/>
    </div>


}

export default UserAvatar;