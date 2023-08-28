import io from "socket.io-client";
import {addMessage} from "../../store/slices/ActiveChatSlice";
import {updateChatsInfo} from "../../store/slices/UserDataSlice";


const Socket = class {
    createConnect = (user, dispatch) => {
        if (user) {
            this.socket = io.connect("http://localhost:8000");
            const {
                _id,
                userAvatar,
                firstname,
                lastname,
                isOnline,
                lastOnline,
                nickname
            } = user;


            const extractedUser = {
                _id,
                userAvatar,
                firstname,
                lastname,
                isOnline,
                lastOnline,
                nickname
            }

            this.socket.emit("userLoggedIn", extractedUser);

            window.addEventListener("beforeunload", () => {
                this.socket.disconnect();
            });

            this.socket.on("newMessage", data => {
                console.log(data);
                dispatch(updateChatsInfo({data: data}));
                dispatch(addMessage({data: data}));
            })
        }
    }
    closeConnect = () => {
        this.socket.disconnect();
    }
    sendMessage = (messageData) => {
        this.socket.emit("sendMessage", messageData);
    }
    readMessage = (userId, chatId) => {
        this.socket.emit("readChat", {userId, chatId});
    }
}

export default new Socket;