import axios from "axios";

export const asyncUserRegister = (user) => async (dispatch, getState) => {
  try {
    console.log(user);
    const { data } = await axios.post(
      "http://localhost:3000/user/register",
      user,
      { withCredentials: true }
    );

    console.log(data);
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
};

export const asyncUserLogin =(user) => async (dispatch,getState)=>{


    try {
        
        const {data}=await axios.post("http://localhost:3000/user/login",user,{withCredentials:true})
        console.log(data);

    } catch (error) {
        console.log(error.response?.data?.message || error.message);
        
    }
}
