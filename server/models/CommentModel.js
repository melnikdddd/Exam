import mongoose, {Mongoose} from "mongoose";


const CommentSchema = new Mongoose.Schema({
    title: {
        type:String,
        required: false,
    },
    text: {
        type:String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    imagesUrl:{
        type: Array,
        default: [],
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

export default new mongoose.model('Comment', CommentSchema);