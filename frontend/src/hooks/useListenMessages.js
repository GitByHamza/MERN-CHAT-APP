import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConservation from './../zustand/useConservation';
import notiRing from '../assets/enboscada.mp3'

const useListenMessages = () => {
    let isNewMessage = false
    const listenMessage = ()=>{
        const {socket} = useSocketContext()
        const {messages,setMessages} = useConservation()
        useEffect(()=>{
            socket?.on("newMessage",(newMessage)=>{
                newMessage.shouldShake = true
                const noti = new Audio(notiRing)
                noti.play()
                setMessages([...messages,newMessage])
            })
            return ()=> socket?.off("newMessage")
        },[socket,setMessages,messages])
    }
    return {isNewMessage,listenMessage}
}

export default useListenMessages
