import CenterWrapper from "../../../../components/Wrapper/CenterWrapper/CenterWrapper";
import {useSelector} from "react-redux";
import {selectUserData} from "../../../../store/slices/UserDataSlice";
import ChatListItem from "./ChatItem/ChatListItem";


function ChatsList(props) {
    const owner = useSelector(selectUserData);
    const {chatsInfo} = owner;

    return (
        <div className={`bg-slate-100 rounded-lg  w-full ${props.className}`}>

        </div>
    );
}

export default ChatsList;