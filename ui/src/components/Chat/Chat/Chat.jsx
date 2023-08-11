import {useSelector} from "react-redux";
import {selectUserData} from "../../../store/slices/UserDataSlice";
import UserAvatar from "../../Images/UserAvatar";
import moment from "moment";


function Chat(props) {
    const owner = useSelector(selectUserData);
    const {user} = props;

    return (
        <div>
            <div className={"h-20 p-5 rounded-lg rounded-b-none border-b border-slate-400 w-full flex flex-row bg-slate-100"}>
                <div className={"flex items-center w-full"}>
                    <div className="col">
                        <UserAvatar image={owner.userAvatar} className={"h-20 w-20"}/>
                    </div>
                    <div className="col ml-3">
                            <p>{owner.lastname} {owner.firstname}</p>
                            <span className={"text-slate-400"}>{moment(owner.lastOnline).calendar()}</span>
                    </div>
                </div>
            </div>
            <div className={"bg-slate-100 bg-opacity-40 h-72"}>

            </div>
            <div className={"border-t border-slate-400 w-full h-24 bg-slate-100 rounded-b-lg"}>

            </div>
        </div>
    );
}

export default Chat;