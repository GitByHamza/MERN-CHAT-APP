import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useConservation from '../zustand/useConservation'

const useGetMessage = () => {
    const [loading,setLoading] = useState(false)
    const {messages,setMessages,selectedConservation} = useConservation()

    useEffect(()=>{
        const getMessages = async () =>{
            setLoading(true)
            try {
                const res = await fetch(`/api/messages/${selectedConservation._id}`,)
                const data = await res.json()
                
                if(data.error){
                    throw new Error(data.error)
                }
                setMessages(data)
            } catch (error) {
                toast.error(error.message)
            } finally{
                setLoading(false)
            }
        }
        if(selectedConservation?._id) getMessages()

    },[selectedConservation?._id,setMessages])
    
    return {messages,loading}
}

export default useGetMessage
