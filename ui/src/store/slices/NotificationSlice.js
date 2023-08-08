import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    appNotifications: [],
    usersNotifications: [],
}

const localStorage = window.localStorage;

const NotificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        pushNotification: (state, action) => {
            const { field, value } = action.payload;
            state[field].push(value);
            localStorage.setItem(field, JSON.stringify(state[field]));
        },
        removeNotification: (state, action) => {
            const { field, value } = action.payload;
            state[field].splice(value, 1);

            localStorage.setItem(field, JSON.stringify(state[field]));
        },
        clearNotifications: (state, action) => {
            const {field} =  action.payload;
            state[field] = [];
            localStorage.setItem(field, JSON.stringify("[]"));
        },
        clearAll: state => (state) => {
            state.appNotifications = [];
            state.usersNotifications = [];

            localStorage.removeItem("appNotifications");
            localStorage.removeItem("usersNotifications");
        },
        setAppNotifications: (state, action) => {

            state.appNotifications = action.payload.app;
        },
        setUsersNotifications: (state, action) => {
            state.usersNotifications = action.payload.users;
        }
    },
})

export const selectAppNotifications = state => state.notification.appNotifications;
export const selectUsersNotifications = state => state.notification.usersNotifications;


export const {
    pushNotification, removeNotification,
    clearNotifications, clearAll,
    setAppNotifications, setUsersNotifications,
} = NotificationSlice.actions;


export default NotificationSlice.reducer;