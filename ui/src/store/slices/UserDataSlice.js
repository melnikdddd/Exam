import {createSlice} from "@reduxjs/toolkit";
import {decodeBase64Image} from "../../components/Images/utils";
import {fetchUsersInChat} from "../../utils/Axios/axiosFunctions";
import {extractProperties} from "../../utils/ArrayFunctions";
import Socket from "../../utils/Socket/socket";

const initialState = {
    data: {
        _id: null,
        firstname: null,
        lastname: null,
        phoneNumber: null,
        email: null,
        aboutUser: null,
        createdAt: null,
        rating: null,
        lastOnline: null,
        userAvatar: null,
        deals: null,
        favoritesUsers: null,
        blockedUsers: null,
        city: null,
        country: null,
        isOnline: null,
        nickname: null,
        isDefaultImage: null,
        chatsInfo: null,
        isChatsUsersSet: false,
    },
    products: []
}


const UserDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            const {userAvatar, ...data} = action.payload;

            const imageData = action.payload.userAvatar?.data?.data || ''
            const image = imageData.length === 0 || !imageData ? '' : imageData;
            const ext = action.payload.userAvatar?.ext || '';

            const {userImage, isDefaultImage} = decodeBase64Image(image, ext);
            data.userAvatar = userImage;
            data.isDefaultImage = isDefaultImage;


            state.data = data;
        },
        clearUserData: (state, action) => {
            state.data = initialState.data;
            state.products = initialState.products;
        },
        updateValue: (state, action) => {
            state.data[action.payload.field] = action.payload.value;
        },
        clearValue: (state, action) => {
            state.data[action.payload.field] = null;
        },
        updateChatsInfo: (state, action) => {
            const {chatId, user, message} = action.payload.data;
            const chatsInfo = [...state.data.chatsInfo];

            const chatInfo = {
                chatId: chatId,
                user: user,
                lastMessage: {text: message.text, timestamp: message.timestamp}
            };

            const chatIndex = chatsInfo.findIndex(elem => elem.chatId === chatId);

            if (chatIndex !== -1) {
                state.data.chatsInfo[chatIndex] = chatInfo;
                return;
            }

            state.data.chatsInfo.push(chatsInfo);
        },

        setUsersToChatInfo: (state, action)=> {
            if (!state.data.isChatsUsersSet) {
                const {users} = action.payload;
                state.data.isChatsUsersSet = true;

                state.data.chatsInfo = replaceUserIdToUser(state.data.chatsInfo, users);
            }
        },
        readMessage: (state, action) => {
            const {chatId} = action.payload;
            const updatedChatInfo = state.data.chatsInfo.map(chat => {
                if (chat.chatId === chatId) {
                    return {
                        ...chat,
                        read: true
                    };
                }
                return chat;
            });
            Socket.readMessage(state.data._id,  chatId);
            state.data.chatsInfo = updatedChatInfo;
        }
    }
});


export const setUserDataInLocalStorage = (userData) => {
    window.localStorage.setItem('userData', JSON.stringify(userData));
}
export const getUserDataFromLocalStorage = () => {
    return window.localStorage.getItem(JSON.parse('userData'));
}

const replaceUserIdToUser = (chatsInfo, users) => {
    return chatsInfo.map(chatInfo => {
        const user = users.find(user => user._id === chatInfo.userId);
        const {userId, ...restChatInfo} = chatInfo;
        return {
            ...restChatInfo,
            user: user
        };
    })
}


export const selectUserData = state => state.userData.data;

export const selectUserImage = state => state.userData.data.userAvatar;

export const selectProducts = state => state.userData.products;

export const {
    setUserData,
    updateValue,
    clearValue,
    clearUserData,
    updateChatsInfo,
    setUsersToChatInfo,
    readMessage,
} = UserDataSlice.actions;


export default UserDataSlice.reducer;

