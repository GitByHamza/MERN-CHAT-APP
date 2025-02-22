import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useLogin = () => {
    const [loading,setloading] = useState(false)
    const { setAuthUser } = useAuthContext()
    const login = async (username,password) =>{

        const success = handleInputErrors(username,password)
        
        if(!success) return;
        setloading(true)
        console.log("In LOGIN FUNCTION");
        try {
            const res = await fetch("/api/auth/login",{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({ username,password })
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
    return {loading, login}
}

export default useLogin

function handleInputErrors(username,password){
    if(!username&&!password ){
        toast.error("Please fill in all the fields")
        return false
    }
    if(!username){
        toast.error("Please Enter Username")
        return false

    }
    if(!password){
        toast.error("Please Enter Password")
        return false
    }
    if(password.length < 6){
        toast.error("Password should be at least 6 characters")
    }

    return true;
}