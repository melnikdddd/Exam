import mongoose from "mongoose";
import {_getUserDirPATH} from "../utils/myFileSytstemUtil.js";
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
            sparse: true,
            default: "",
            required: function () {
                return this.phoneNumber === '';
            },
        },
        phoneNumber: {
            type: String,
            sparse: true,
            default: "",
            required: function () {
                return this.email === '';
            },

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
        avatarUrl: {
            type: String,
            default: function (){
                return _getUserDirPATH(this._id) + '/user-avatar.png';
            },
            immutable: true,
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
