import BackGround from "../../components/Wrapper/BackGround/BackGround";
import Container from "../../components/Wrapper/Container/Container";
import {useEffect, useState} from "react";
import ChatsList from "./Chats/ChatsList";
import Chat from "./Chat/Chat";
import {useLocation} from "react-router-dom";


function ChatPage(props) {
    const location = useLocation();
    const chatInitialState = location.state?.isChatSelected || false;

    const [isChatSelected, setIsChatSelected] = useState(true);
    const [selectedUser, setSelectedUser] = useState(isChatSelected && location.state.user || null)

    const [isShowBoth, setIsShowBoth] = useState(false)

    useEffect(()=>{
        if (window.innerWidth < 800){
            setIsShowBoth(false);
            return;
        }
        setIsShowBoth(true);
    }, [window.innerWidth])

    return (
        <BackGround background={"linear-gradient(111deg, rgba(27,102,122,1) 39%, rgba(112,201,119,1) 91%)"}>
            <Container className={"pt-6"}>
                <div className={" w-full h-full"}>
                    <Chat />
                    {/*{isShowBoth ?*/}
                    {/*    <>*/}
                    {/*        <div>*/}
                    {/*            <ChatsList/>*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*            <Chat/>*/}
                    {/*        </div>*/}
                    {/*    </>*/}
                    {/*    :*/}
                    {/*    isChatSelected ? <Chat user={selectedUser}/> : <ChatsList/>*/}
                    {/*}*/}
                </div>
            </Container>
        </BackGround>
    );
}

export default ChatPage;