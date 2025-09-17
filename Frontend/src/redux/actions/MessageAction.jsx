import axios from "axios"
import { loadmessage } from "../slice/MsgSlice";

export const asyncGetMessage=(chat)=>async(dispatch,getState)=>{

        try {
            const {data}=await axios.get(`http://localhost:3000/message/${chat}`)
           
            console.log(data.messages);
            dispatch(loadmessage(data.messages))
        } catch (error) {
                console.log(error.response?.data?.message);
        }
}


export const asyncSentMsg =(msg)=>async(dispatch,getState)=>{

        try {
                
        } catch (error) {
                
        }
}

