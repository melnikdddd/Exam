import {useSelector} from "react-redux";
import {selectUserImage} from "../../store/slices/UserDataSlice";



const UserAvatar = (props) =>{
    const image = useSelector(selectUserImage);

    return <div className={props.className} >
        <img src={image} alt={"userImage"} className={"w-full h-full rounded-full"}/>
    </div>
}

export default UserAvatar;