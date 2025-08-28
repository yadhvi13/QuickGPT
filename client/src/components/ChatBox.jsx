import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'

const ChatBox = () => {

const {selectedChat, theme} = useAppContext()

const [messages, setMessages] = useState([])
// if i set the loading == true
const [loading, setLoading] = useState(false)

// state for prompt
const [prompt,setPrompt] = useState('')
const [mode, setMode] = useState('text')
const [ispublished, setIsPublished] = useState(false)

const onSubmit = async (e) => {
  e.preventDefault()
}

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

         {/* three dot loading animation */}
         {
          loading && <div className='loader flex items-center gap-1.5'>
               <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
               <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
               <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
          </div>
         }
      </div>

{/* prompt input box */}
      <form onSubmit={onSubmit} className='bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-3xl p-3 pl-4 mx-auto flex gap-4 items-center'>
        <select onChange={(e)=>setMode(e.target.value)} value={mode} className='text-sm pl-3 pr-2 outline-none'>
          <option className='dark:bg-purple-900 p-3 rounded' value="text">Text</option>
          <option className='dark:bg-purple-900 p-3 rounded' value="image">Image</option>
        </select>
        <input onChange={(e)=>setPrompt(e.target.value)} value={prompt} type="text" placeholder='Type your prompt here...' className='flex-1 w-full text-sm outline-none' required />

{/* when the loading is true we cannot enable the button */}
        <button disabled={loading}>
          <img src={loading? assets.stop_icon : assets.send_icon} alt=""
          className='w-8 cursor-pointer' />
        </button>
      </form>
    </div>
  )
}

export default ChatBox
