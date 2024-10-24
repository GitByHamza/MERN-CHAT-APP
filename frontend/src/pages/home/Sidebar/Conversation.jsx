import React from 'react'
import useConservation from '../../../zustand/useConservation';
import { useSocketContext } from '../../../context/SocketContext';
import useListenMessages from '../../../hooks/useListenMessages';
import { GoDotFill } from "react-icons/go";

const Conversation = ({conservation,lastIndex,emoji}) => {
  const {selectedConservation,setSelectedConservation} = useConservation()
  const {isNewMessage} = useListenMessages()
  const isSelected = selectedConservation?._id === conservation._id
  const { onlineUsers }  = useSocketContext()
  const isOnline = onlineUsers.includes(conservation._id)
  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
    ${isSelected ? "bg-sky-600":""} ${isNewMessage ? "bg-sky-300" : ""}
    `}onClick={() => setSelectedConservation(conservation)}>
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className='w-12 rounded-full'>
            <img src={conservation.profilePic} alt="user avatar" />
        </div>
      </div>
      <div className='flex flex-col flex-1'>
        <div className='flex gap-3 justify-center'>
            <p className='font-bold text-gray-200'>{conservation.fullname}</p>
            <span className='text-xl'>{emoji}</span>
            <span className='text-xl'>{isNewMessage ? <GoDotFill className=''/> : ("")}</span>

        </div>
      </div>
    </div>
    {!lastIndex && <div className='divider my-0 py-0 h-1' />}
    </>
  )
}

export default Conversation
