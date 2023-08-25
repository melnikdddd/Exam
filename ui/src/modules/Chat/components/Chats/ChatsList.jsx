import CenterWrapper from "../../../../components/Wrapper/CenterWrapper/CenterWrapper";
import {useDispatch, useSelector} from "react-redux";
import {selectUserData} from "../../../../store/slices/UserDataSlice";
import ChatListItem from "./ChatItem/ChatListItem";
import {selectChatId, setSelectedChat} from "../../../../store/slices/ActiveChatSlice";

function ChatsList(props) {
    const owner = useSelector(selectUserData);
    const selectedChatId = useSelector(selectChatId);
    const {chatsInfo} = owner;
    const {users} = props
    const dispatch = useDispatch();

    console.log(chatsInfo);

    const findUser = (users, userId) => {
        return users.find((user) => {
            return user._id === userId;
        });
    }
    const selectChat = (user, chatId)=>{
        props.setIsChatSelected(true);
        dispatch(setSelectedChat({chatId: chatId, user: user}));
    }

    return (
        <div className={`bg-slate-100 rounded-lg  w-full ${props.className}`}>
            {
                chatsInfo.length > 0 ?
                    <div className={"flex flex-col"}>
                        {
                            chatsInfo.map((chat) => {
                                console.log(users);
                                console.log(chat.userId)
                                const user = findUser(users, chat.userId);
                                return (
                                    <ChatListItem
                                        key={chat.chatId}
                                        isSelected={selectedChatId === chat.chatId}
                                        user={user}
                                        onClick={() => selectChat(user, chat.chatId)}
                                        chatInfo={{lastMessage: chat.lastMessage, read: chat.read}}
                                    />

                                )
                            })
                        }
                    </div>
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