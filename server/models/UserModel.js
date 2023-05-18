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
            unique: true,
        },
        phoneNumber: {
            type: String,
            unique: true,
        },
        city: {
            type: String,
            required: false,
        },
        passwordHash: {
            type: String,
            required: true
        },
        rating:{
            type: Number,
            default: 0,
        },
        avatarUrl: String,
        aboutUser: {
            type: String,
            required: false,
            default: '',
        }

    },
    {
        //при создании любого пользователя создает дату создания или обновления
        timestamps: true,
    }
);

export default mongoose.model('User', UserSchema)