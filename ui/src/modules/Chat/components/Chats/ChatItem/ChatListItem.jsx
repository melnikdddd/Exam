import UserAvatar from "../../../../../components/Images/UserAvatar";

function ChatListItem(props) {
    const {firstName, lastname, userAvatar, nickname} = props;
    return (
        <div className={"flex justify-center w-full"}>
            <div>
                <UserAvatar image={userAvatar} className={"w-20 h-20"} isImageNeedDecoding={true}/>
            </div>
            <div className={"flex flex-col"}>
                <span>{firstName + " " + lastname}</span>
                <span className={"bg-gray-400"}>
                    {nickname}
                </span>
            </div>
        </div>
    );
}

export default ChatListItem;