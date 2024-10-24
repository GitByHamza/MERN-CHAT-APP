import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignUp from '../../hooks/useSignUp';


const Signup = () => {
    const navigate = useNavigate();
    
    // State variable to hold all input values
    const [inputs, setInputs] = useState({
        fullname: '',
        username: '',
        gender: '',
        password: '',
        confirmPassword: ''
    });
    const [error,setError] = useState('')
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs,[name]: value });
    };
    const {loading,signup} = useSignUp()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs)
    };

    return (
        <>

        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up
                    <span className='text-blue-500'> Chat App</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullname" className='label p-2'>
                            <span className='text-base label-text text-white'>Full Name</span>
                        </label>
                        <input
                            type="text"
                            name="fullname"
                            value={inputs.fullname}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="input input-bordered input-info w-full max-w-xs" 
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className='label p-2'>
                            <span className='text-base label-text text-white'>Username</span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={inputs.username}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="input input-bordered input-info w-full max-w-xs" 
                        />
                    </div>
                    
                    <div className='flex justify-center items-center'>
                        <div className="form-control">
                            <label htmlFor="male" className='label gap-2 cursor-pointer'>
                                <span className='label-text'>Male</span>
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    id="male" 
                                    className='radio radio-info border-slate-900' 
                                    value="male"
                                    checked={inputs.gender === 'male'}
                                    onChange={handleChange} 
                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label htmlFor="female" className='label gap-2 cursor-pointer'>
                                <span className='label-text'>Female</span>
                                <input 
                                    type="radio" 
                                    name="gender" 
                                    id="female" 
                                    className='radio radio-info border-slate-900' 
                                    value="female"
                                    checked={inputs.gender === 'female'}
                                    onChange={handleChange} 
                                />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className='label p-2'>
                            <span className='text-base label-text text-white'>Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="input input-bordered input-info w-full max-w-xs" 
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className='label p-2'>
                            <span className='text-base label-text text-white'>Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={inputs.confirmPassword}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="input input-bordered input-info w-full max-w-xs" 
                        />
                    </div>
                    <a className="link link-accent mt-2 inline-block justify-start" onClick={() => navigate("/login")}>Already have an account?</a>
                    <div>
                        <button type="submit" className='btn btn-block btn-sm mt-2' disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "SIGN UP"}
                        </button>
                    </div>
                </form>
            </div>

        </div>

        </>
    );
}

export default Signup;
