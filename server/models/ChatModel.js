import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    firstUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    secondUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    messages: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        }
    ],
})

export default mongoose.model("Chat", chatSchema);
