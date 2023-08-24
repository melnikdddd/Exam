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

            console.log("socket Id login " + socket.id)

        });
        socket.on("disconnect", async () => {
                await setOffline(socket.userId);
                onlineUsers.delete(socket.userId);
        });
        socket.on("sendMessage", async (data) => {
            const {chatId, userId, message} = data;

            console.log(message);

            const ownId = socket.userId;

            //обновляем базу данных сообщений
            const chat = chatId ?
                await updateMessages(chatId, message) : await createChat(message);

            data.chatId = chat._id;

            await updateBoth(ownId, data);
            //отправялем сообщение второму пользователю
            const userSocket = onlineUsers.get(userId);
            socket.emit("newMessage", data)

            if (userSocket) {
                io.to(userSocket).emit("newMessage", data);
            }
        })

        socket.on("readChat", async (data) => {
            await readChat(data)
        })
    })

}

const updateBoth = async (currentUserId, data) => {
    const {chatId, userId, message} = data;
    await updateChatsInfo(currentUserId, {chatId, userId: userId, message, isRead: true});
    await updateChatsInfo(userId, {chatId, userId: currentUserId, message, isRead: false});

}

export default socket;