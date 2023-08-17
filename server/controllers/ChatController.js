import ChatModel from "../models/ChatModel.js";


class ChatController {
    getMessages = async (req, res) => {
        try {
            const ownerId = req.userId;
            const {usersId} = req.params;

            const messages = ChatModel.findOne({
                users: {$all: [ownerId, usersId]}
            }).select("messages");


            return messages ? res.status(200).json({success: false, messages: messages})
                : res.status(404).json({success: false, messages: "Chat does`not exists."})

        } catch (e) {
            return res.status(500).json({success: false, messages: "Server error"});
        }

    }

}


export default new ChatController;