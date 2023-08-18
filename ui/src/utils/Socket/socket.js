import io from "socket.io-client";


const Socket = class {
    createConnect = (userId) =>{
        if (userId){
            this.socket = io.connect("http://localhost:8000");
            this.socket.emit("userLoggedIn", userId);

            window.addEventListener("beforeunload", () => {
                this.socket.disconnect();
            });
        }
    }
    closeConnect = () => {
        this.socket.disconnect();
    }
    sendMessage = (messageData) =>{
        this.socket.emit("sendMessage", messageData);
    }
}

export default new Socket;