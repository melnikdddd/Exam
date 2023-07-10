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
       isActivate: null,
       userAvatar: null,
       deals: null,
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

            data.userAvatar = decodeBase64Image(image, ext);
            state.data = data;

        },
        clearUserData: (state, action) =>{
                state.data = initialState.data;
                state.products = initialState.products;
        },
        updateValue : (state, action) =>{
            state.userData[action.payload.field] = action.payload;
        },
        clearValue : (state, action) =>{
            state.userData[action.payload.field] = null;
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

export const {setUserData,updateValue, clearValue, clearUserData} = UserDataSlice.actions;

export default UserDataSlice.reducer;

