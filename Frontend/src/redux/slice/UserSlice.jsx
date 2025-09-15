import { createSlice } from "@reduxjs/toolkit";

const initialState={
  user:""
}

const UserSlice=createSlice({
  name:'user',
  initialState,
  reducers:{
    loadUser:(state,actions)=>{

    }
  }
})

export const {loadUser}=UserSlice.actions;
export default UserSlice.reducer;