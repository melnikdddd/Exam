import {useSelector} from "react-redux";
import {selectUserData} from "../../../store/slices/UserDataSlice";
import UserAvatar from "../../../components/Images/UserAvatar";
import moment from "moment";
import styles from "./Chat.module.scss"
import EmojiPicker from "../../../components/EmojiPicker/EmojiPicker";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faFaceSmile} from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "../../../components/hooks/useWindowDimensions";
import CenterWrapper from "../../../components/Wrapper/CenterWrapper/CenterWrapper";

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
        return <CenterWrapper>
            <div className={"bg-white rounded-lg shadow-md p-10"}>
                <h1 className={"text-xl2"}>
                    Select a user to start chatting.
                </h1>
            </div>
        </CenterWrapper>
    }

    return (
        <div className={"h-full"}>
            <div className={"h-20 p-5 rounded-lg rounded-b-none border-b border-slate-400 w-full flex flex-row py-12 bg-slate-100"}>
                <div className={"flex items-center w-full"}>
                    <div className="col">
                        <UserAvatar image={user.userAvatar} className={"h-20 w-20"}/>
                    </div>
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
            <div className={styles.inputBlock}>
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
                                top={"-450px"}
                                left={innerWidth > 525 ? "-320px" : "-160px"}
                                handleEmojiSelect={handleEmojiSelect}
                                onMouseLeave={handleEmojiSmileLeave}/>
                            }
                        </div>
                    </div>
                    <div className={"w-1/4 flex items-center justify-center"}>
                        <button className={styles.submitButton} disabled={!isValid}>
                            {innerWidth > 525 ?
                                <span>Message</span>
                                :
                                <FontAwesomeIcon icon={faPaperPlane} />
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Chat;