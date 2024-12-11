import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: []
};

const chatbotSlice = createSlice({
    name: 'chatbotSlice',
    initialState,
    reducers: {
        setMessages: (state, { payload }) => {
            state.messages.push(payload);
        },
    }
});

export const { setMessages } = chatbotSlice.actions;
export default chatbotSlice.reducer;
