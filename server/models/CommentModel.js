import mongoose from "mongoose";
import {_getUserDirPATH} from "../utils/myFileSytstemUtil.js";


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
    imageDirPath: {
        type: String,
        default: function (){
            return _getUserDirPATH(this.user.id + '/' + this._id);
        },
        immutable: true
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


