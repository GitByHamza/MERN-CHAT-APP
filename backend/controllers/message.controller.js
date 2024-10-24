import Message from '../models/message.Model.js';
import { getReceiverSocketId, io } from '../socket/socket.js';
import Conservation from './../models/conversation.Model.js';


export const sendMessage = async (req,res)=>{
    try {
        const { message } = req.body
        const { id:receiverId } = req.params
        const senderId = req.user._id

        let conservation = await Conservation.findOne({
            participants:{ $all: [senderId,receiverId] }
        })
        if(!conservation){
            conservation = await Conservation.create({
                participants:[senderId,receiverId],

            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })
        if(newMessage){
            conservation.messages.push(newMessage._id)
        }

        await Promise.all([ conservation.save(),newMessage.save() ])

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json({error:"Error in Sent Message"})
        
    }
}
export const getMessages = async (req,res)=>{
    try {
        const { id:userToChatId } = req.params
        const senderId = req.user._id

        const conservation = await Conservation.findOne({
            participants:{ $all: [ senderId,userToChatId ] }
        }).populate("messages")//NOT REFERENCE , IT"S MESSAGE ITSELF

        if(!conservation) return res.status(200).json([])
        
        const messages = conservation.messages
        
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({error:"Error in Sent Message"})
        
    }
}