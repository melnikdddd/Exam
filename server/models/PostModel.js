import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
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
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: "UAH",
        },
        condition: {
            type: String,
            default: "",
        },
        characteristics:{
            type: Object,
            default: {"":""},
            required: false,
        },
        city: {
            type: String,
            default: "",
            required: false,
        },
        rating: {
            ratingNumber: {type: Number, default: 0},
            votes: {type: Number, default: 0},
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        images:{
            type: Array,
            default: [],
        },
        idOfUsersVotes: {
            type: Array,
            default : function (){
                return [this.owner];
            }
        },

    },{
        timestamps: true,
        strictPopulate: false,
    }
)



export default mongoose.model('Post', PostSchema)