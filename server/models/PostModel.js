import mongoose from "mongoose";
import {_getUserDirPATH} from "../utils/myFileSytstemUtil.js";

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        tags: {
            type: Array,
            default: [],
            required: false,
        },
        price: {
            type: String,
            default: "Free",
        },
        condition: {
            type: String,
            default: "New",
        },
        characteristics:{
            type: Object,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        rating: {
            type: Number,
            default: 0,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        imageDirPath: {
            type: String,
            default: function (){
                return _getUserDirPATH(this.owner._id) + '/' + this._id;
            },
            immutable: true
        }

    },{
        timestamps: true,
    }
)

export default mongoose.model('Post', PostSchema)