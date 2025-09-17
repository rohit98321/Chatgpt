import { createSlice } from "@reduxjs/toolkit";


const initialState={
    messages:[]
}
const MsgSlice=createSlice({
    name:"message",
    initialState,
    reducers:{
        loadmessage:(state,actions)=>{
                state.messages=actions.payload
        },
        addmessage:(state,actions)=>{
                state.messages.push(actions.payload)
        }
    }
})

export const {loadmessage,addmessage} =MsgSlice.actions
export default MsgSlice.reducer;
