import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: false,
            default: "",
        },
        phoneNumber: {
            type: String,
            unique: false,
            default: "",
        },
        blockedUsers: {
            type: Array,
            default: []
        },
        favoritesUsers: {
            type: Array,
            default: []
        },
        reports: {
            type: Array,
            default: []
        },
        hashPassword: {
            type: String,
            required: true
        },
        rating: {
            likes: {type: Number, default: 0},
            dislikes: {type: Number, default: 0},
        },
        latestOnline : {type: Date, default: null},
        deals : {
            purchase:{type: Number, default: 0},
            sales:{type: Number, default: 0},
        },
        userStatus: {type: String, default: ''},
        userAvatar:{
            data: {
                type: Buffer,
                default: '',
            },
            ext:{type: String, default: ''}
        },
        aboutUser: {
            type: String,
            required: false,
            default: '',
        },
    },
    {
        timestamps: true,
        strictPopulate: false,
    }
);




export default mongoose.model('User', UserSchema);
