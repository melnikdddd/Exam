import {createSlice} from "@reduxjs/toolkit";
import {decodeBase64Image} from "../../components/Images/utils";

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
       isOnline : null,
       nickname: null,
       isDefaultImage: null,
   },
   products : []
}


const UserDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData: (state, action) =>{
            const {userAvatar,...data} = action.payload;

            const imageData = action.payload.userAvatar?.data?.data || ''
            const image = imageData.length === 0  || !imageData ? '' : imageData;
            const ext = action.payload.userAvatar?.ext || '';

             const{userImage, isDefaultImage} = decodeBase64Image(image, ext);
             data.userAvatar = userImage;
             data.isDefaultImage = isDefaultImage;


            state.data = data;
        },
        clearUserData: (state, action) =>{
                state.data = initialState.data;
                state.products = initialState.products;
        },
        updateValue : (state, action) =>{
            state.data[action.payload.field] = action.payload.value;
        },
        clearValue : (state, action) =>{
            state.data[action.payload.field] = null;
        },
        updateChatsInfo : (state, action) => {
            const {chatId, userId, message} = action.payload.data;
            const chatsInfo = [...state.data.chatsInfo];

            const chatInfo = {
                chatId: chatId,
                userId: userId,
                lastMessage: {text: message.text, timestamp: message.timestamp}
            };

            const chatIndex = chatsInfo.findIndex(elem => elem.chatId === chatId);

            if (chatIndex !== -1) {
                state.data.chatsInfo[chatIndex] = chatInfo;
                return;
            }

            state.data.chatsInfo.push(chatsInfo);
        },
        readMessage: (state, action) => {
            const { chatId } = action.payload;
            const updatedChatInfo = state.data.chatsInfo.map(chat => {
                if (chat.chatId === chatId) {
                    return {
                        ...chat,
                        read: true
                    };
                }
                return chat; // Возвращаем оригинальный объект, если условие не выполнено
            });

            state.data.chatsInfo = updatedChatInfo;
        }
    }
});



export const setUserDataInLocalStorage = (userData) =>{
    window.localStorage.setItem('userData', JSON.stringify(userData));
}
export const getUserDataFromLocalStorage = () =>{
    return  window.localStorage.getItem(JSON.parse('userData'));
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
    readMessage,
} = UserDataSlice.actions;

export default UserDataSlice.reducer;

