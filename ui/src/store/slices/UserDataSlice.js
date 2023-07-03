import {createSlice} from "@reduxjs/toolkit";
import {decodeBase64Image} from "../../components/Images/utils";

const initialState = {
  data: {
      id: null,
      firstname: null,
      lastname: null,
      phoneNumber: null,
      email: null,
      aboutUser: null,
      createdAt: null,
      rating: null,
      userAvatar: null,
  }
}


const UserDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData: (state, action) =>{
            const {userAvatar,...data} = action.payload;

            const imageData = action.payload.userAvatar?.data | '';
            const ext = action.payload.userAvatar?.ext | '';

            data.userAvatar = decodeBase64Image(imageData, ext);
            state.data = data;

        },
        clearUserData: (state, action) =>{
                state.userData = {};
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

export const {setUserData,updateValue, clearValue, clearUserData} = UserDataSlice.actions;

export default UserDataSlice.reducer;

