import {Server} from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import UserModel from "../../models/UserModel.js";
import ChatController from "../../controllers/ChatController.js";
import ChatModel from "../../models/ChatModel.js";

dotenv.config();

const PORT = process.env.SOCKET_PORT;

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
            await UserModel.findOneAndUpdate({_id: userId}, {isOnline: true})
        });
        socket.on("disconnect", async () => {
            onlineUsers.delete(socket.userId);
            await UserModel.findOneAndUpdate({_id: socket.userId}, {isOnline: false, lastOnline: new Date()});
        });
        socket.on("sendMessage", async (data) => {
            const {chatId, user, message} = data;

            if (!chatId) {
                const chat = await new ChatModel(message);
                await chat.save();
            } else {
                await ChatModel.findOneAndUpdate(
                    {id: chatId},
                    {$push: {messages: message}})
            }

            //отправялем сообщение второму пользователю
            const userSocket = onlineUsers.get(user._id);
            if (userSocket) {
                io.to(userSocket).emit("newMessage", data);
            }
        })
    })


}

export default socket;