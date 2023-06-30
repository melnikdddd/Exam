import {combineReducers, createStore} from '@reduxjs/toolkit';

import AuthReducer from "./slices/AuthSlice";

import UserDataReducer from "./slices/UserDataSlice";

const rootReducer = combineReducers({
        auth: AuthReducer,
        userData: UserDataReducer,
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;


