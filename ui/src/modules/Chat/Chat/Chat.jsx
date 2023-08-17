import {useSelector} from "react-redux";
import {selectUserData} from "../../../store/slices/UserDataSlice";
import UserAvatar from "../../../components/Images/UserAvatar";
import moment from "moment";
import styles from "./Chat.module.scss"
import EmojiPicker from "../../../components/EmojiPicker/EmojiPicker";
import {useState} from "react";
import {useForm} from "react-hook-form";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faFaceSmile} from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "../../../components/hooks/useWindowDimensions";
import CenterWrapper from "../../../components/Wrapper/CenterWrapper/CenterWrapper";
import {Link} from "react-router-dom";

function Chat(props) {
    const owner = useSelector(selectUserData);
    const {user} = props;


    const {
        formState: {
            isValid
        },
        register,
        setValue,
        watch,
    } = useForm({mode: "onChange"})

    const innerWidth = useWindowDimensions().width;
    const adaptiveWidth = props.isShowBoth ? 950 : 525;

    const inputValue = watch("input");

    const handleEmojiSelect = emoji =>{

        setValue("input", inputValue + emoji.native, {shouldValidate: true})
    }
    const handleInputChange = (event) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
    const handleEmojiSmileLeave = () =>{
        setIsEmojiShow(false);
    }

    const [isEmojiShow, setIsEmojiShow] = useState(false);

    if (!user){
        return <div className={`bg-opacity-40 bg-white rounded-lg min-h-[300px] shadow-md w-full h-full ${props.className}`} >
            <CenterWrapper>
                <div className={"bg-white rounded-lg shadow-md p-10"}>
                    <h1 className={"text-xl2"}>
                        Select a user to start chatting.
                    </h1>
                </div>
            </CenterWrapper>
        </div>

    }

    return (
        <div className={"h-full flex-1"}>
            <div className={`h-20 p-5 rounded-lg rounded-b-none border-b border-slate-400 w-full flex flex-row py-12 bg-slate-100 ${props.className}`}>
                <div className={"flex items-center w-full"}>
                    <Link to={`/users/${user._id}`} className="col">
                        <UserAvatar image={user.userAvatar} className={"h-20 w-20"}/>
                    </Link>
                    <div className="col ml-3">
                            <p>{user.lastname} {user.firstname}</p>
                            <span className={"text-slate-400"}>
                                {
                                    user.isOnline ? "Online" : moment(user.lastOnline).calendar()
                                }
                            </span>
                    </div>
                </div>
            </div>
            <div className={"bg-slate-100 bg-opacity-40 min-h-[62vh]"}>

            </div>
            <div className={`${styles.inputBlock} ${props.className}`}>

                {owner.blockedUsers.includes(user._id)
                    ?
                    <CenterWrapper>
                        <h1>User is blocked</h1>
                    </CenterWrapper>
                    :
                    <form className={"flex"}>
                        <div className={"w-3/4 rounded-xl border border-gray-300 p-2 flex items-end"}>
                        <textarea  placeholder={"Enter text..."}
                                   className={styles.chatInput}
                                   rows={1}
                                   onInput={handleInputChange}
                                   {...register("input", {required: true})}
                        />
                            <div className={"relative"}>
                                <FontAwesomeIcon icon={faFaceSmile}
                                                 className={`h-6 cursor-pointer ${isEmojiShow ? 'text-blue-500' : 'text-gray-400'}`}
                                                 onClick={()=> setIsEmojiShow(!isEmojiShow)}
                                />
                                {
                                    isEmojiShow && <EmojiPicker
                                        adaptiveWidth={adaptiveWidth}
                                        top={"-450px"}
                                        left={innerWidth > adaptiveWidth ? "-320px" : "-160px"}
                                        handleEmojiSelect={handleEmojiSelect}
                                        onMouseLeave={handleEmojiSmileLeave}/>
                                }
                            </div>
                        </div>
                        <div className={"w-1/4 flex items-center justify-center"}>
                            <button className={styles.submitButton} disabled={!isValid}>
                                {innerWidth > adaptiveWidth ?
                                    <span>Message</span>
                                    :
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                }
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}

export default Chat;