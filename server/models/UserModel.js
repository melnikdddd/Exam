import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

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
        city: {
            type: String,
            required: false,
        },
        hashPassword: {
            type: String,
            required: true
        },
        rating: {
            ratingNumber: {type: Number, default: 0},
            votes: {type: Number, default: 0},
        },
        userAvatar:{
            data: Buffer,
            contentType: String,
        },
        aboutUser: {
            type: String,
            required: false,
            default: '',
        }

    },
    {
        timestamps: true,
        strictPopulate: false,
    }
);




export default mongoose.model('User', UserSchema);
