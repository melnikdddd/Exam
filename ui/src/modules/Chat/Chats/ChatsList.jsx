import {useSelector} from "react-redux";
import {selectUserData} from "../../../store/slices/UserDataSlice";
import {useEffect, useState} from "react";
import {fetchGet} from "../../../utils/Axios/axiosFunctions";
import LoadingBlock from "../../../components/Loading/LoadingBlock/LoadingBlock";
import CenterWrapper from "../../../components/Wrapper/CenterWrapper/CenterWrapper";
import {library} from "@fortawesome/fontawesome-svg-core";
import ChatListItem from "../ChatItem/ChatListItem";
import chat from "../Chat/Chat";

function ChatsList(props) {

    const userData = useSelector(selectUserData);
    const [isLoading, setIsLoading] = useState(false);
    const [chats, setChats] = useState([]);

    const {_id} = userData;

    useEffect(() => {
        const getChats = async () => {
            const response = await fetchGet(`/chats/${_id}`);
            setIsLoading(true);
            return response.chats;
        }

        setChats(getChats());

    }, []);

    if (!isLoading) {
        return (
            <div className={"w-full h-full"}>
                <CenterWrapper>
                    <div className={"bg-white rounded-lg shadow-md p-10"}>
                        <LoadingBlock className={"h-20 w-20"}/>
                    </div>
                </CenterWrapper>
            </div>
        )
    }

    return (
        <div className={"w-full h-full bg-white rounded-lg min-h-[300px]"}>
            {chats.length > 0 ?
                <ul>
                    chats.map(chat => (
                    <li>
                        <ChatListItem
                            firstname={chat.user.firstname}
                            lastname={chat.user.lastname}
                            userAvatar={chat.user.userAvatar}
                            nickname={chat.user.lastname}
                        />
                    </li>
                    ))
                </ul>
                :
                <h1 className={"w-full text-2xl text-center p-5"}>
                    No chats.
                </h1>
            }
        </div>
    );
}

export default ChatsList;