import {Server} from "socket.io";
import {readChat, setOffline, setOnline, updateChatsInfo} from "../../controllers/UserController.js";
import {createChat, updateMessages} from "../../controllers/ChatController.js";


const socket = (server) => {

    const onlineUsers = new Map;

    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    })

    io.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
    io.on("connection", socket => {
        socket.on("userLoggedIn", async (userId) => {
            socket.userId = userId;
            onlineUsers.set(userId, socket.id);
            await setOnline(userId);
        });
        socket.on("disconnect", async () => {
            await setOffline(socket.userId);
            onlineUsers.delete(socket.userId);
        });
        socket.on("sendMessage", async (data) => {
            const {chatId, userId, message} = data;

            //обновляем базу данных сообщений
            chatId ? await updateMessages(chatId, message) : await createChat(message);

            //обновляем бд пользователей (chatsInfo)
            await updateChatsInfo(socket.userId, {chatId, userId: userId, message, isRead: true});
            await updateChatsInfo(userId, {chatId, userId: socket.userId, message, isRead: false});

            //отправялем сообщение второму пользователю
            const userSocket = onlineUsers.get(userId);

            if (userSocket) {
                io.to(userSocket).emit("newMessage", {chatId, userId, message});
            }
        })

        socket.on("readChat", async (data) => {
            await readChat(data)
        })
    })

}


export default socket;