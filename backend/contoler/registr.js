import {User} from "../module/user.module.js";
import httpStatus from "http-status";
import bcrypt, {hash} from "bcrypt";
import crypto from "crypto";
const login = async(req ,res)=>{
  const {username , password} = req.body;
   if (!username || !password) {
        return res.status(400).json({ message: "Please Provide" })
    }
  try{
    const user = await User.findOne({username});
  if(!user){
    return res.status(httpStatus.NOT_FOUND).json({message : "user didi not exsist  "})
  }
  const isMatch = await  bcrypt.compare(password , user.password);
  if(!isMatch){
    return res.status(401).json({message : "Invalid password"})
  }
  if(isMatch){
    let token = crypto.randomBytes(20).toString("hex");
    user.token = token;
     await user.save();
    return res.status(httpStatus.OK).json({token : token});
  }
  }catch(err){
    return res.status(500).json({message : `something was wroung ${err}`})
  }
 
}
const register = async(req ,res) =>{
    const{Name ,  username  , password} = req.body;
    try{
      const  existinguser = await User.findOne({username});
      if(existinguser){
        return res.status(httpStatus.FOUND).json({message : "user is exsist "})
      }
      const hashedpassword = await bcrypt.hash(password , 10);
      const user = new User({
      Name : Name , 
      username  : username, 
      password : hashedpassword,
    });
    await user.save();
     res.status(httpStatus.CREATED).json({messge  :"ÿou have register"});
    }catch(err){
        res.json({message :   `something whant wroung ${err}`})
    }
  
}
export {login , register}