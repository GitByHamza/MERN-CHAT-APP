import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useConservation from '../../../zustand/useConservation';
import UseGetConservations from './../../../hooks/UseGetConservations';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search,setSearch] = useState("")
  const {setSelectedConservation} = useConservation()
  const { conservations } = UseGetConservations()

  const handleSubmit = (e) =>{
    e.preventDefault()

    if(!search) return;
    if(search.length < 3){
      return toast.error("Search term should be greater than 3 characters")
    }
    const conversation = 
    conservations.find((each) => each.fullname.toLowerCase().includes(search.toLowerCase()))
    
    if(conversation){
      setSelectedConservation(conversation)
      setSearch('')
    }else toast.error("No user found with this username")
  }

  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit} >
        <input type="text" placeholder='Search ...' value={search} className='input input-bordered rounded-full' onChange={(e)=> setSearch(e.target.value)}/>
        <button type='submit' className='btn btn-circle'>
          <FaSearch className='w-6 h-6 outline-none' />
        </button>
    </form>
  )
}

export default SearchInput