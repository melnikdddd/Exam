import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    messages: [],
}

const ActiveChatSlice = createSlice({
    name: "activeChat",
    initialState,
    reducers: {
        clearMessages: (state, action) => {
            state.messages = [];
        },
        loadMessages: (state, action) => {
            state.messages = action.payload.messages;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload.message);
        }
    }
})

export const {
    clearMessages,
    loadMessages,
    addMessage
} = ActiveChatSlice.actions;

export const selectMessages = state => state.messages;

export default ActiveChatSlice.reducer;