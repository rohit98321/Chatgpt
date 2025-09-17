import axios from "axios";
import { loadChats } from "../slice/ChatsSlice";

export const asyncGetChats = () => async (dispatch, getState) => {


  try {
    const { data } = await axios.get("http://localhost:3000/chat/chats", {
      withCredentials: true,
    });

    dispatch(loadChats(data.chats))
    console.log(data);
  } catch (error) {
        console.log(error)
  }


};

