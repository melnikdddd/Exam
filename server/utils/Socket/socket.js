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
            const {chatId, user, message} = data;
            const ownId = socket.userId;

            //обновляем базу данных сообщений
            const chat = chatId ?
                await updateMessages(chatId, message) : await createChat(message);

            data.chatId = chat._id;


            await updateBoth(ownId, data);
            //отправялем сообщение второму пользователю
            const userSocket = onlineUsers.get(user._id);
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
    const {chatId, user, message} = data;
    const userId = user._id;

    await updateChatsInfo(currentUserId, {chatId, userId, message});
    await updateChatsInfo(userId, {chatId, userId: currentUserId, message});

}

export default socket;