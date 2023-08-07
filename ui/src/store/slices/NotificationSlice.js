import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    appNotifications: [],
    usersNotifications: [],
}

const NotificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        pushNotification: (state, action) => {
            state[action.payload.field].push(action.payload.value)
        },
        removeNotification: (state, action) => {
            state[action.payload.field].splice(action.payload.value, 1);
        },
        clearNotifications: (state, action) => {
            state[action.payload.field] = [];
        },
        clearAll: state => (state) => {
            state.notification.appNotifications = [];
            state.notification.usersNotifications = [];
        }
    },
})

export const selectAppNotifications = state => state.notification.appNotifications;
export const selectUsersNotifications = state => state.notification.usersNotifications;


export const {
    pushNotification, removeNotification,
    clearNotifications, clearAll
} = NotificationSlice.actions;


export default NotificationSlice.reducer;