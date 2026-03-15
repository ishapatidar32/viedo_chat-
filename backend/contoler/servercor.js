import { constants } from "crypto";
import { Server, Socket } from "socket.io";
let connection={}  // to check number of connection 
let message = {}
let timeonline = {}

 export const connectToSocket = (server) =>{
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.on("connection" , (Socket) =>{  // as like addeventlistiner 
        Socket.on("accept-call" , (path) =>{ // same name at sock.emit()
            if(connections[path] === undefined){
                connections[path] = []
            }
            connections[path].push(Socket.id)
            timenOline[Socket.id] = new Date();
            for(let i =0;i<connections[path].length;++i){
                io.to(connections[path][i]).emit("user-joined" ,Socket.id,connections[path] );
            }
            if(messages[path] !==  undefined){
                for(let a =0;a<messages[path].length;++a){
                    io.to(Socket.id).emit("chat-message" , messages[path][a]['data'],messages[path][a]['sender'],messages[path][a]['socket-id-sender'])
                }
            }
        })
        Socket.on("signal" ,(toId , message) =>{
            io.to(toId).emit("signal" , Socket.id , message);
        })
        Socket.on("chat-message" ,(data , sender) =>{
            const[matchingRoom , found] = Object.entries(connections)
            .reduce(([room , isFound] , [roomkey , roomValue]) =>{
                if(!isFound && roomValue.includes(Socket.id)){
                    return [roomkey , true];
                }
                return [room , isFound];
            },['',false]);
            if(found === true){
                if(messages[matchingRoom] === undefined){
                    messages[matchingRoom] = []
                }
                message[matchingRoom].push({'sender' : sender , "data" : data , "socket-id-sender" : Socket.id});
                console.log("message" , key, ":" , sender ,data  )
                connections[matchingRoom].forEach((elem) =>{
                    io.to(elem).emit("chat-message" , data , sender , Socket.id);
                })
            }
        })
        Socket.on("disconnect" , ()=>{
           let diffTime = Math.abs(timeOnline[Socket.id]-new Date())
           var key

            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {
                        key = k

                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id)
                        }

                        var index = connections[key].indexOf(socket.id)

                        connections[key].splice(index, 1)


                        if (connections[key].length === 0) {
                            delete connections[key]
                        }
                    }
                }

            }
        })
    })
   return io;
}
