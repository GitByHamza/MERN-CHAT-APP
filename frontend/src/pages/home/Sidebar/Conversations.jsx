import React from 'react'
import UseGetConservations from '../../../hooks/UseGetConservations'
import Conservation from './Conversation';
import { getRandomEmoji } from '../../../utils/emoji';

const Conversations = () => {
  const {loading,conservations} = UseGetConservations()


  return (
    <div className='py-2 overflow-auto'>
        {conservations.map((conservation,idx)=>(
          <Conservation key={conservation._id} conservation={conservation}
          emoji = {getRandomEmoji()}
          lastIndex = {idx === conservations.length - 1}
          />
        ))}

        {loading ? <span className='loading loading-spinner'></span> : null}
    </div>
  )
}

export default Conversations