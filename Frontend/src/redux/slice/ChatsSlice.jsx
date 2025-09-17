import { createSlice } from "@reduxjs/toolkit";

    const initialState={
        chats:[],
        chat:""
    }
const ChatsSlice=createSlice({
    name:"chat",
    initialState,
    reducers:{
        loadChats:(state,actions)=>{
            state.chats=actions.payload;

        },
        currentChat:(state,actions)=>{
            state.chat=actions.payload;
            console.log(state.chat);
        }

    }
})

export const {loadChats,currentChat}=ChatsSlice.actions
export default ChatsSlice.reducer