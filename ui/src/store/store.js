import {combineReducers, createStore} from '@reduxjs/toolkit';

import AuthReducer from "./slices/AuthSlice";
import UserDataReducer from "./slices/UserDataSlice";
import NotificationReducer from "./slices/NotificationSlice";

const rootReducer = combineReducers({
        auth: AuthReducer,
        userData: UserDataReducer,
        notification: NotificationReducer,
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;


