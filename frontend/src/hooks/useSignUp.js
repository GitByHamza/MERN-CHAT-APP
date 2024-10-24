import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useSignUp = () => {
    const [loading,setloading] = useState(false)
    const {authUser,setAuthUser} = useAuthContext()
    const signup = async({ fullname,username,gender,password,confirmPassword }) =>{
        const success = handleInputErrors({fullname,username,gender,password,confirmPassword})
        
        if(!success) return;
        setloading(true)
        
        try {
            const res = await fetch("/api/auth/signup",{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({ fullname,username,password,confirmPassword,gender})
            })

            const data = await res.json()

            if(data.error){
                throw new Error(data.error)
            }
            localStorage.setItem("user-info",JSON.stringify(data))
            setAuthUser(data)
            
        } catch (error) {
            toast.error(error.message)
        } finally{
            setloading(false)
        }
    }
    return {loading, signup}
}

export default useSignUp

function handleInputErrors({fullname,username,gender,password,confirmPassword}){
    if(!fullname||!username||!gender||!password||!confirmPassword){
        toast.error("Please fill in all the fields")
        return false
    }
    if(password !== confirmPassword){
        toast.error("Password don't match")
        return false
    }
    if(password.length < 6){
        toast.error("Password should be at least 6 characters")
    }

    return true;
}