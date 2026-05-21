import { createContext  , useContext, useState   }  from "react";
import {useNavigate} from "react-router-dom";
import axios, { HttpStatusCode } from "axios";
export const  authContext = createContext({});
const client = axios.create({
       baseURL : "http://localhost:8000/api/v1/users"
});
export const AuthProvider = ({children }) => {
    const [userdata , setuserdata] =  useState(authContext);
    const  navigate = useNavigate();
    const handleRegister = async (username , password , name) =>{
        try{
            const response = await client.post("/register" , {
               username :  username , password : password ,     Name : name});
               if(response.status === HttpStatusCode.Created){
                navigate("/");
                  return response.data;
               }
              
        }catch(error){
            throw new Error("Registration failed");
        }
    }
    const handleLogin = async (username, password) => {
        try {
            const response = await client.post("/login", { username:username, password:password });
            if(response.status === HttpStatusCode.Ok){
                localStorage.setItem("token" , response.data.token);
                navigate("/")
                return response.data;
            }
           
        } catch (error) {
            throw new Error("Login failed");
        }
       
    };
    const data ={
     userdata , setuserdata, handleRegister , handleLogin
    }
    return (
        <authContext.Provider value={data}>
            {children}
        </authContext.Provider>
    );
  
};
export function useAuth() {
    return useContext(authContext);
  }
