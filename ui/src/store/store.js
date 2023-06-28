import {combineReducers, configureStore, createStore} from '@reduxjs/toolkit';

import AuthReducer from "./slices/AuthSlice";
import {create} from "axios";

const rootReducer = combineReducers({
        auth: AuthReducer,
});

const store = createStore(rootReducer);

export default store;


