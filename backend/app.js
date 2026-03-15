import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import { connectToSocket} from "./contoler/servercor.js";
import cors  from "cors";
import userrout from "./router/user.routes.js";
const app = express();
const server = createServer(app);  // 
const io =  connectToSocket(server);
app.set("port" , 8000);
app.use(cors());
app.use(express.json({limit : "40Kb"}));
app.use(express.urlencoded({limit:"40kb" , extended : true}));
app.use("/api/v1/users" , userrout);
const start = async() =>{
  app.set("mongo_user")
  const connectionDB = await mongoose.connect("mongodb+srv://ishapatidar61_db_user:jJoF3tVMnVpzd4un@cluster0.trrocqk.mongodb.net/")
 console.log(`MonGO connected db host : ${connectionDB.connection.host}`)
  server.listen(app.get("port") , ()=>{
    console.log("app is listing");
});
}
app.get("/home" , (req ,res)=>{
    res.send("working");
})
start();