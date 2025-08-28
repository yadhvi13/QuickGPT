import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'

const ChatBox = () => {

const {selectedChat, theme} = useAppContext()

const [messages, setMessages] = useState([])
const [loading, setLoading] = useState(false)

// messages that displaye in chatBox
useEffect(()=> {
  if(selectedChat){
    setMessages(selectedChat.messages)
  }
}, [selectedChat])

  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:mx-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>
      
      {/* chat messages */}
      <div className='flex-1 mb-5 overflow-y-scroll'>
        {/* means no selected chat here */}
         {messages.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
            <img 
            className='w-full max-w-56 sm:max-w-68'
            src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} alt="" />
            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>Ask me anything...</p>
          </div>
         )}

         {messages.map((message, index)=> <Message key={index} message={message} />)}
      </div>

      <form>

      </form>
    </div>
  )
}

export default ChatBox
