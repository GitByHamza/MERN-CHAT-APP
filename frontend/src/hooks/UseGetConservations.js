import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const UseGetConservations = () => {
    const [loading,setLoading] = useState(false)
    const [conservations,setConservations] = useState([])
    useEffect(()=>{
        const getConversations = async () =>{
            setLoading(true)
            try {
                const res = await fetch("/api/users")
                const data = await res.json()

                if(data.error){
                    throw new Error(data.error)
                }
                setConservations(data)
            } catch (error) {
                toast.error(error.message)
            } finally{
                setLoading(false)
            }
        }
        getConversations()
    },[])
    return {loading,conservations}
}

export default UseGetConservations
