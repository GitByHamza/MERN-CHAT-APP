import { Server } from "socket.io";
import http from 'http'
import express from 'express'

const app = express()

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"]
    }
})



const usersSocketMap = {}

io.on("connection",(socket)=>{
    console.log("A USER CONNECT : ",socket.id);
    const userId = socket.handshake.query.userId

    if(userId !== 'undefined') usersSocketMap[userId] = socket.id
    //it is used to send events to all the connected clients
    io.emit("getOnlineUsers",Object.keys(usersSocketMap))
    
    socket.on("disconnect",()=>{
        console.log("User Disconnected : ",socket.id);
        delete usersSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(usersSocketMap))
    })
})

export const getReceiverSocketId = (receiverId) =>{
    return usersSocketMap[receiverId]
} 

export { app,io,server }