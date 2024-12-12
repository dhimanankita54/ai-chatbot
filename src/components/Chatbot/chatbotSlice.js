import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from "uuid";

const initialState = {
    messages: [],
    chatHistory: [],
};

const chatbotSlice = createSlice({
    name: 'chatbotSlice',
    initialState,
    reducers: {
        setMessages: (state, { payload }) => {
            state.messages.push(payload);
        },
        resetMessages: (state) => {
            state.messages = [];
        },
        addChatHistory: (state, { payload }) => {
            console.log(state.chatHistory)
            state.chatHistory.push(payload);
            // if (!state.chatHistory.some(chat => chat.id === payload.id)) {
            // }
        },
        clearSessionHistory(state) {
            state.chatHistory = [];
        },
        openChatFromHistory: (state, { payload }) => {
            // Load a selected chat from history into the current messages array
            const chat = state.chatHistory.find(chat => chat.id === payload.id);
            if (chat) {
                state.messages = [...chat.messages];  // Load chat's messages into the current chat
            }
        },
        startNewChat: (state) => {
            // Check if there's a current conversation to add to history
            if (state.messages.length > 0) {
                // Create a new chat object with current messages
                const currentChat = {
                    id: uuid(),  // New unique chat ID
                    messages: [...state.messages],  // Preserve current messages`
                };

                // Add the current chat to chat history (if not already added)
                if (!state.chatHistory.some(chat => chat.id === currentChat.id)) {
                    console.log(currentChat)
                    state.chatHistory.push(currentChat);
                    // Reset the messages array for a fresh new chat
                    // state.messages = [];
                }
            }
        },
    }
});

export const { setMessages, resetMessages, addChatHistory, clearSessionHistory, openChatFromHistory, startNewChat } = chatbotSlice.actions;
export default chatbotSlice.reducer;
