import mongoose from "mongoose";

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
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        imagesUrl: {
            type: Array,
            default: [],
        }

    },{
        timestamps: true,
    }
)

export default mongoose.model('Post', PostSchema)