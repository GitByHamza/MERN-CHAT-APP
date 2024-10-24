import useGetMessages from '../../../hooks/useGetMessages';
import MessageSkeleton from '../../../components/skeletons/MessageSkeleton';
import Message from './Message';
import { useEffect, useRef } from 'react';
import useListenMessages from '../../../hooks/useListenMessages';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const {isNewMessage,listenMessage} = useListenMessages()
  const lastMessage = useRef()
  listenMessage()
  useEffect(()=> {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behaviour : "smooth" })
    }, 0);
  },[messages])

  return (
    <div className="px-4 flex-1 overflow-auto">

      {!loading && messages.length > 0 && messages.map((message) => (
            <div key={message._id} ref={lastMessage}>
              
              <Message message={message} isNew = {isNewMessage}/>
            </div>
      ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a Message to start the conversation...</p>
      )}
    </div>
  );
};

export default Messages;
