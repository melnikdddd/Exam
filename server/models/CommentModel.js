import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema(
    {
    title: {
        type:String,
        required: false,
    },
    text: {
        type:String,
        required: true,
    },
    owner: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    images: {
        type: Array,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    rating: {
        type: Number,
        default: 0
    }

}, {timestamps: true});


export default  mongoose.model('Comment', CommentSchema);


