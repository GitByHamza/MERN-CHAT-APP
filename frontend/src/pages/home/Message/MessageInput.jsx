import React, { useState } from 'react'
import {BsSend} from 'react-icons/bs'
import useSentMessage from '../../../hooks/useSentMessage'

const MessageInput = () => {
    const [message,setMessage] = useState()
    const {sendMessage,loading} = useSentMessage()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!message) return;
        await sendMessage(message)
        setMessage("")
    }
    
  return (
    <form onSubmit={handleSubmit} className='px-4 my-3'>
      <div className="w-full relative">
        <input type="text" 
        name="message" 
        id="message" 
        value={message}
        onChange={(e)=> setMessage(e.target.value)}
        className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
        placeholder='Enter Message'
        />
        <button type="submit" className='btn btn-block btn-sm mt-2' disabled={loading}>
            {loading ? <span className='loading loading-spinner'></span> : <BsSend/>}
        </button>
      </div>
    </form>
  )
}

export default MessageInput
