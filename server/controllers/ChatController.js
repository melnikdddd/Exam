import ChatModel from "../models/ChatModel.js";
import {chat} from "googleapis/build/src/apis/chat/index.js";
import * as constants from "constants";
import UserModel from "../models/UserModel.js";

class ChatController {
    getUsersChat = async (req, res) => {
        try {
            const userId = req.userId;
            const chats = await ChatModel.find({users: userId});

            if (!chats){
               return res.status(200).json({success: true, chats: []})
            }

           const chatsWithUsers = await this.#service.getChatsWithUsers(chats,  userId);

           return res.status(200).json({success: true, chats: chatsWithUsers});

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Server error.",
            })
        }
    }

    #service = {
        getChatsWithUsers : async (chats, userId)=>{
            const userIds = [];

            chats.map(chat => {
                users.push(chat.users.filter(id => id === userId)[0])
            })

            const users = await UserModel.find({_id: {$in: userIds}})
                .select("id userAvatar firstname lastname isOnline lastOnline");

            return chats.map((chat, index) => ({
                user: users[index],
                messages: chat.messages
            }));
        }
    }
}


export default new ChatController;