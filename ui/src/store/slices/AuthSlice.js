import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    auth: false,
}

const AuthSlice = createSlice({
    name:"Auth",
    initialState,
    reducers: {
        setAuth (state, action){

        }
    }
})

export const {setAuth} = AuthSlice.actions;

export default AuthSlice;