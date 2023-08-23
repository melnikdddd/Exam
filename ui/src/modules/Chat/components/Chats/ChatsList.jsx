import CenterWrapper from "../../../../components/Wrapper/CenterWrapper/CenterWrapper";
import {useSelector} from "react-redux";
import {selectUserData} from "../../../../store/slices/UserDataSlice";
import ChatListItem from "./ChatItem/ChatListItem";


function ChatsList(props) {
    const owner = useSelector(selectUserData);
    const {chatsInfo} = owner;

    return (
        <div className={`bg-slate-100 rounded-lg  w-full ${props.className}`}>
            {
                chatsInfo.length > 0 ?
                    chatsInfo.map(chat => (
                        <ChatListItem
                            key={chat.chatId}

                        />
                    ))
                    :
                    <CenterWrapper>
                        <h1 className={"w-full text-2xl text-center p-5 text-gray-500 bg-slate-100"}>
                            No chats.
                        </h1>
                    </CenterWrapper>
            }
        </div>
    );
}

export default ChatsList;