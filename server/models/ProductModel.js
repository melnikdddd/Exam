import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            default: "",
        },
        text: {
            type: String,
            required: true,
            default: "",
        },
        type: {
            type: String,
            required: true,
            default: "",
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            default: 0
        },
        characteristics:{
            type: String,
            default: "",
        },
        rating: {
            likes: {type: Number, default: 0},
            dislikes: {type: Number, default: 0},
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },{
        timestamps: true,
        strictPopulate: false,
    }
)



export default mongoose.model('Product', ProductSchema)