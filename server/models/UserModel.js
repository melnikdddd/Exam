import mongoose from "mongoose";
import {_getUserDirPATH} from "../utils/fsWorker.js";
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
            default: "",
        },
        phoneNumber: {
            type: String,
            default: "",
            required: true,

        },
        city: {
            type: String,
            required: false,
        },
        hashPassword: {
            type: String,
            required: true
        },
        rating:{
            type: Number,
            default: 0,
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
    }
);



UserSchema.plugin(uniqueValidator);

export default mongoose.model('User', UserSchema);
