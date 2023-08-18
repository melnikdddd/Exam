import ChatModel from "../models/ChatModel.js";


class ChatController {
    getMessages = async (req, res) => {
        try {
            const {chatId} = req.params;

            const messages = ChatModel.findOne({_id: chatId}).select("messages");


            return messages ? res.status(200).json({success: false, messages: messages})
                : res.status(404).json({success: false, message: "Chat does`not exists."})

        } catch (e) {
            return res.status(500).json({success: false, message: "Server error"});
        }

    }

}


export default new ChatController;