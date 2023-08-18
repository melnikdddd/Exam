import {Server} from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import UserModel from "../../models/UserModel.js";
import ChatController from "../../controllers/ChatController.js";
import ChatModel from "../../models/ChatModel.js";

dotenv.config();

const PORT = process.env.SOCKET_PORT;

const socket = (server) => {

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
            await UserModel.findOneAndUpdate({_id: userId}, {isOnline: true})
        });
        socket.on("disconnect", async () => {
            await UserModel.findOneAndUpdate({_id: socket.userId}, {isOnline: false, lastOnline: new Date()});
        });
        socket.on("sendMessage", async (data) => {
            const {chatId, users, message} = data;

             if (!chatId) {
                const chat = await new ChatModel(data);
               await chat.save();
               socket.emit("MessageSent", {...chat, isNew: true});

               return;
             }
        })
    })


}

export default socket;