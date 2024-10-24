import React, { useEffect } from 'react'
import useConservation from '../../zustand/useConservation'
import { TiMessages } from "react-icons/ti"
import MessageInput from './Message/MessageInput'
import Messages from './Message/Messages'
import { useAuthContext } from '../../context/AuthContext'

const MessageContainer = () => {
  const {selectedConservation,setSelectedConservation} = useConservation()
  useEffect(()=>{
    //clean up the selection on re login
    return ()=> setSelectedConservation(null)
  },[setSelectedConservation])

  return (
    <div className='md:min-w-[450px] flex flex-col'>
      {!selectedConservation ? (
        <NoChatSelected/>
      ) : (
        <>
          <div className='bg-slate-500 px-4 py-2 mb-2'>

            <span className='label-text'>To : </span>
            <div className="avatar online">
              <div className='w-5 rounded-full'>
                  <img src={selectedConservation.profilePic} alt="user avatar" />
              </div>
            </div>
            <span className='text-gray-900 font-bold'>  {selectedConservation.fullname}</span>
          </div>
          <Messages/>
          <MessageInput/>
        </>
      )}
    </div>
  )
}

export default MessageContainer

const NoChatSelected = () =>{
  const { authUser } = useAuthContext()
  return(
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👍 {authUser.fullname}</p>
        <p>Start Messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center"/>
      </div>
    </div>
  )
}