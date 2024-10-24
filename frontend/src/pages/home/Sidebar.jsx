import React from 'react'
import SearchInput from './Sidebar/SearchInput'
import Conversations from './Sidebar/Conversations'
import Logout from './Sidebar/Logout'

const Sidebar = () => {
  return (
    <div className='rounded-lg p-4 flex flex-col'>
        <SearchInput />
        <div className="divider px-3"></div>
        <Conversations />
        <Logout />
    </div>
  )
}

export default Sidebar