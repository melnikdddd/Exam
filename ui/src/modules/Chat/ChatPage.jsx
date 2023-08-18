import BackGround from "../../components/Wrapper/BackGround/BackGround";
import Container from "../../components/Wrapper/Container/Container";
import {useEffect, useState} from "react";
import ChatsList from "./components/Chats/ChatsList";
import Chat from "./components/Chat/Chat";
import {useLocation} from "react-router-dom";
import useWindowDimensions from "../../components/hooks/useWindowDimensions";
import styles from "./ChatPage.module.scss"
import {useSelector} from "react-redux";
import {selectUserData} from "../../store/slices/UserDataSlice";

function ChatPage(props) {
    const owner = useSelector(selectUserData);
    const location = useLocation();

    const innerWidth = useWindowDimensions().width;

    const [isChatSelected, setIsChatSelected] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null)

    const [chatId, setChatId] = useState(null);
    const [isShowBoth, setIsShowBoth] = useState(false)


    useEffect(() => {
        if (location.state?.user) {
            const user = location.state.user;
            const userId = user._id;
            if (owner.chatsInfo) {
                const chat = owner.chatsInfo.find(chatInfo => chatInfo.userId === userId)?.chatId;
                if (chat) {
                    setChatId(chat);
                }
            }
            setIsChatSelected(true);
            setSelectedUser(user);
        }
    }, []);



    useEffect(() => {
        setIsShowBoth(innerWidth > 736);
    }, [innerWidth]);


    return (
        <BackGround background={"linear-gradient(111deg, rgba(27,102,122,1) 39%, rgba(112,201,119,1) 91%)"}>
            <Container className={"pt-6"}>
                <div className={`w-full flex `}>
                    <ChatsList
                        className={isShowBoth ? `${styles.showBoth} rounded-r-none border-r border-r-slate-400` :
                            `${isChatSelected && `hidden`}`}/>
                    <Chat
                        user={selectedUser} chatId={chatId} isShowBoth={isShowBoth}
                        setIsChatSelected={setIsChatSelected}
                        className={isShowBoth ? `${styles.showBoth} rounded-l-none` :
                            `${!isChatSelected && `hidden`}`}/>
                </div>
            </Container>
        </BackGround>
    );
}

export default ChatPage;