const mongoose=require("mongoose")

const connectDb= async ()=>{
    try {

       await mongoose.connect(process.env.MONGODB_URL)
        console.log("database connect successfully");

    } catch (error) {
        console.log(error);
        
    }
}

module.exports=connectDb