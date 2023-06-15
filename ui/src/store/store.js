import {configureStore} from '@reduxjs/toolkit';

import AuthReducer from "./slices/AuthSlice";

export default configureStore({
    reducer: {
        auth: AuthReducer,
    }
});

