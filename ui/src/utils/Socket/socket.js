import io from "socket.io-client";
import {addMessage} from "../../store/slices/ActiveChatSlice";
import {updateChatsInfo} from "../../store/slices/UserDataSlice";


const Socket = class {
    createConnect = (userId, dispatch) =>{
        if (userId){
            this.socket = io.connect("http://localhost:8000");
            this.socket.emit("userLoggedIn", userId);

            window.addEventListener("beforeunload", () => {
                this.socket.disconnect();
            });

            this.socket.on("newMessage", data => {
                dispatch(addMessage({message: data.message}));
                dispatch(updateChatsInfo({data: data}));
            })
        }
    }
    closeConnect = () => {
        this.socket.disconnect();
    }
    sendMessage = (messageData) =>{
        this.socket.emit("sendMessage", messageData);
    }
    readMessage = (userId, chatId) => {
        this.socket.emit("readMessage", {userId, chatId});
    }
}

export default new Socket;