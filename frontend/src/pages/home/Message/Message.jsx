import React from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import useConservation from '../../../zustand/useConservation'

const Message = ({message}) => {
    
    const {authUser} = useAuthContext()
    const {selectedConservation} = useConservation()
    const fromMe = message.senderId === authUser._id
    
    const chatClassName = fromMe ? 'chat-end' : 'chat-start'
    const profilePic = fromMe ? authUser.profilePic : selectedConservation.profilePic
    const bubbleBgColor = fromMe ? 'bg-blue-500' : "bg-slate-950"
    const shake = message.shouldShake ? "shake" : ""
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
            <img src={profilePic} alt="" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shake}`}>{message.message}</div>
      <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>{Time(message.createdAt)}</div>
    </div>
  )
}

export default Message

function Time(dataString) {
    const date = new Date(dataString)
    const hours = padzero(date.getHours())
    const minutes = padzero(date.getMinutes())

    return `${hours} : ${minutes}`

}
function padzero(number) {
  return number.toString().padStart(2,"0")
}