import BackGround from "../../components/Wrapper/BackGround/BackGround";
import Container from "../../components/Wrapper/Container/Container";
import {useEffect, useState} from "react";
import ChatsList from "./components/Chats/ChatsList";
import Chat from "./components/Chat/Chat";
import {useLocation} from "react-router-dom";
import useWindowDimensions from "../../components/hooks/useWindowDimensions";
import styles from "./ChatPage.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {selectUserData} from "../../store/slices/UserDataSlice";
import {fetchUsersInChat} from "../../utils/Axios/axiosFunctions";
import {extractProperties} from "../../utils/ArrayFunctions";
import {useNavigate} from "react-router-dom";
import {pushNotification} from "../../store/slices/NotificationSlice";
import moment from "moment";
import {clearChat, setSelectedChat} from "../../store/slices/ActiveChatSlice";
import CenterWrapper from "../../components/Wrapper/CenterWrapper/CenterWrapper";
import LoadingBlock from "../../components/Loading/LoadingBlock/LoadingBlock";

function ChatPage(props) {
    const owner = useSelector(selectUserData);
    const location = useLocation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const innerWidth = useWindowDimensions().width;

    const [isChatSelected, setIsChatSelected] = useState(false);
    const [isShowBoth, setIsShowBoth] = useState(false)

    const [users, setUsers] = useState([]);

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const getUsers = async () => {
            if (owner.chatsInfo.length > 0) {
                const users = await fetchUsersInChat(owner._id, extractProperties(owner.chatsInfo, ["userId"]));

                if (!users) {
                    dispatch(pushNotification({
                        value: {
                            title: "Warning", type: "Warning", text: "Error, try later please.", createdAt: moment()
                        },
                        field: "appNotifications"
                    }))
                    navigate("/home");
                    return;
                }

                setUsers(users);
                console.log(users);
            }
            setIsLoading(true);
        }
        getUsers();
        if (location.state?.user) {
            loadingSelectChat(location.state?.user);
        }
        return () => {
            dispatch(clearChat());
        }
    }, []);
    const loadingSelectChat = (user) => {
        if (!user) {
            return;
        }

        const chat = owner.chatsInfo.find(chatInfo => chatInfo.userId === user._id);
        const chatId = chat?.chatId || null;

        dispatch(setSelectedChat({chatId, user}));
        setIsChatSelected(true);
    };


    useEffect(() => {
        setIsShowBoth(innerWidth > 736);
    }, [innerWidth]);


    if (!isLoading) {
        return (
            <BackGround background={"linear-gradient(111deg, rgba(27,102,122,1) 39%, rgba(112,201,119,1) 91%)"}>
                <Container>
                    <CenterWrapper>
                        <LoadingBlock className={"h-20"}/>
                    </CenterWrapper>
                </Container>
            </BackGround>
        )
    }


    return (
        <BackGround background={"linear-gradient(111deg, rgba(27,102,122,1) 39%, rgba(112,201,119,1) 91%)"}>
            <Container className={"pt-6"}>
                <div className={`w-full flex `}>
                    <ChatsList
                        users={users} setIsChatSelected={setIsChatSelected}
                        className={isShowBoth ? `${styles.showBoth} rounded-r-none border-r border-r-slate-400` :
                            `${isChatSelected && `hidden`}`}/>
                    <Chat
                        isShowBoth={isShowBoth} setIsChatSelected={setIsChatSelected}
                        className={isShowBoth ? `${styles.showBoth} rounded-l-none` :
                            `${!isChatSelected && `hidden`}`}/>
                </div>
            </Container>
        </BackGround>
    );
}

export default ChatPage;