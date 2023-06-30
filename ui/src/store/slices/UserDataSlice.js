import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  userData: {
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
            state.userData = action.payload;
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


export const {setUserData,updateValue, clearValue, clearUserData} = UserDataSlice.actions;

export default UserDataSlice.reducer;

