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
        nickname: {
            type: String,
            default: "",
        },
        city: {
          type: String,
          default: "",
        },
        country: {
            type: String,
            default: "",
        },
        blockedUsers: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'UserProfile',
            default: [],
            set: function(users) {
                return Array.from(new Set(users));
            }
        },
        favoritesUsers: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'UserProfile',
            default: [],
            set: function(users) {
                return Array.from(new Set(users));
            }
        },
        reports: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'UserProfile',
            default: [],
            set: function(users) {
                return Array.from(new Set(users));
            }
        },
        hashPassword: {
            type: String,
            required: true
        },
        rating: {
            likes: {
                type: [mongoose.Schema.Types.ObjectId],
                ref: 'UserProfile',
                default: [],
                set: function(users) {
                    return Array.from(new Set(users));
                }
            },
            dislikes: {
                type: [mongoose.Schema.Types.ObjectId],
                ref: 'UserProfile',
                default: [],
                set: function(users) {
                    return Array.from(new Set(users));
                }
            },
        },
        lastOnline : {type: Date, default: null},
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
