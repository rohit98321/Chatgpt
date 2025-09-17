import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/UserSlice";
import chatReducer from "../slice/ChatsSlice";
import messageReducer from "../slice/MsgSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chats:chatReducer,
    message:messageReducer
  },
});
