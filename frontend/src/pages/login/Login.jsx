import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UseLogin from '../../hooks/UseLogin'

const Login = () => {
    const navigate = useNavigate()
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const {loading,login} = UseLogin()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log("In handle Submit");
        
        await login(username,password)
    }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>Login
                 <span className='text-blue-500'> Chat App</span>
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="" className='label p-2'>
                        <span className='text-base label-text text-white'>Username</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Type here"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                        className="input input-bordered input-info w-full max-w-xs" />
                </div>
                <div>
                    <label htmlFor="" className='label p-2'>
                        <span className='text-base label-text text-white'>Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Type here"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className="input input-bordered input-info w-full max-w-xs" />
                </div>
                <a className="link link-accent mt-2 inline-block justify-start" onClick={()=>navigate("/SignUp")}>Don't Have an account ?</a>
                <div>
                        <button type="submit" className='btn btn-block btn-sm mt-2' disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "LOGIN"}
                        </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login