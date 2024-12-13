import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from "uuid";

const initialDefaultChatId = uuid();

const initialState = {
    messages: [],
    chatHistory: [
        {
            id: initialDefaultChatId,
            messages: [], // Messages for the default chat
        },
    ], // History of chats
    activeChatId: initialDefaultChatId,
};

const chatbotSlice = createSlice({
    name: 'chatbotSlice',
    initialState,
    reducers: {
        setMessages: (state, { payload }) => {
            // state.messages.push(payload);
            const currentChat = state.chatHistory.find(chat => chat.id === state.activeChatId);
            if (currentChat) {
                currentChat.messages.push(payload);
            }
        },
        resetMessages: (state) => {
            state.messages = [];
        },
        addChatHistory: (state, { payload }) => {
            // console.log(state.chatHistory)
            state.chatHistory.push(payload);
        },
        clearSessionHistory(state) {
            state.chatHistory = [];
            const newDefaultChatId = uuid(); // Reset with a new default chat
            state.chatHistory.push({ id: newDefaultChatId, messages: [] });
            state.activeChatId = newDefaultChatId;
        },
        setActiveChat(state, { payload }) {
            state.activeChatId = payload; // Set the active chat ID
            const activeChat = state.chatHistory.find(chat => chat.id === payload);
            state.messages = activeChat ? activeChat.messages : [];
        },
        createNewChat(state) {
            const newChat = { id: uuid(), messages: [] };
            state.chatHistory.push(newChat);
            state.activeChatId = newChat.id;
            state.messages = [];
        }
    }
});

export const { setMessages, resetMessages, addChatHistory, clearSessionHistory, setActiveChat, createNewChat } = chatbotSlice.actions;
export default chatbotSlice.reducer;
