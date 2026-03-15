import mongoose, { Schema} from "mongoose";
const userSchem = new Schema({
    Name : {
        type : String,
        require : true,
    },
    username : {
        type : String,
        unique : true, 
        require : true,
    },
    password : {
        type : String,
        require : true,
    },
    token : {
        type : String
    }  
});
const User = mongoose.model("User" , userSchem);
export {User};