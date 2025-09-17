import { useDispatch } from "react-redux";
import { asyncGetMessage } from "../redux/actions/MessageAction";
import { useParams } from "react-router-dom";
import {currentChat} from "../redux/slice/ChatsSlice"



const chatbtn = ({ chat }) => {


  const id=chat._id;
  const dispatch=useDispatch()
   const messageHandler=()=>{
     
     
   
      dispatch(asyncGetMessage(id))
      dispatch(currentChat(id))
  }

  return (
    <button
    
   onClick={messageHandler}
    className="bg-blue-800 text-center my-5 h-[50px]">
      {chat.title}
     
    </button>
  );
};

export default chatbtn;
