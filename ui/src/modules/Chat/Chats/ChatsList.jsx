
import CenterWrapper from "../../../components/Wrapper/CenterWrapper/CenterWrapper";


function ChatsList(props) {
    const {chats} = props;

    return (
        <div className={`bg-slate-100 rounded-lg  w-full ${props.className}`}>
            <CenterWrapper>
                <h1 className={"w-full text-2xl text-center p-5 text-gray-500 bg-slate-100"}>
                    No chats.
                </h1>
            </CenterWrapper>
        </div>
    );
}

export default ChatsList;