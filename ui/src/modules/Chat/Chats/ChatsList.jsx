import {useSelector} from "react-redux";
import {selectUserData} from "../../../store/slices/UserDataSlice";

function ChatsList(props) {

    const userData = useSelector(selectUserData)
    const {_id} = userData;

    return (
        <div className={"w-full h-full"}>
           Chats
        </div>
    );
}

export default ChatsList;