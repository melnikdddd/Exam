import BackGround from "../../components/Wrapper/BackGround/BackGround";
import Container from "../../components/Wrapper/Container/Container";
import {useEffect, useState} from "react";
import Chats from "../../components/Chat/Chats/Chats";
import Chat from "../../components/Chat/Chat/Chat";


function ChatPage(props) {
    const [isChatSelected, setIsChatSelected] = useState(false);
    const [isShowBoth, setIsShowBoth] = useState(window.innerWidth > 800)

    useEffect(()=>{
        if (window.innerWidth < 800){
            setIsShowBoth(false);
        }

    }, [window.innerWidth])

    return (
        <BackGround background={"linear-gradient(111deg, rgba(27,102,122,1) 39%, rgba(112,201,119,1) 91%)"}>
            <Container className={"pt-6"}>
                <div className={"flex flex-col w-full h-full bg-white rounded-lg flex-between"}>
                    {isShowBoth ?
                        <div>
                            <div className={"w-1/3"}>
                                <Chats/>
                            </div>
                            <div>
                                <Chat/>
                            </div>
                        </div>
                        :
                        (isChatSelected ? <Chats/> : <Chat/>)
                    }

                </div>
            </Container>
        </BackGround>
    );
}

export default ChatPage;