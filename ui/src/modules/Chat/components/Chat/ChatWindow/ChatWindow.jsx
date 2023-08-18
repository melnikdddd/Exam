import CenterWrapper from "../../../../../components/Wrapper/CenterWrapper/CenterWrapper";
import styles from "./ChatWindow.module.scss";
import moment from "moment";

function ChatWindow(props) {
    const {messages, ownerId} = props;


    return (
        <div className={"bg-slate-100 bg-opacity-40 min-h-[50vh] max-h-[50vh] w-full overflow-auto"}>
            {
                messages.length > 0 ?
                    <div className={"flex flex-col flex-wrap w-full h-full px-2 pt-0 pb-3"}>
                        {
                            [...messages].map((message, index) => {
                                const isOwnerMessage = message.user === ownerId;

                                const positionClass = isOwnerMessage ? 'justify-end' : 'justify-start';
                                const messageClass = isOwnerMessage ? styles.ownerMessage : styles.userMessage;

                                return  (
                                    <div key={index} className={`w-full flex mt-3 ${positionClass}`}>
                                        <div className={`${styles.message} ${messageClass}`}
                                        >
                                            <p className={styles.timeStamp}>{moment(message.timestamp).calendar()}</p>
                                            <p>{message.text}</p>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>
                    :
                    <CenterWrapper>
                        <h1 className={"text-xl p-4 bg-slate-500 rounded-lg bg-opacity-70 text-slate-200"}>Send
                            hello!</h1>
                    </CenterWrapper>
            }

        </div>
    );
}

export default ChatWindow;