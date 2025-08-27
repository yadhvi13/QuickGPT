import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets";


const AppContext = createContext()

export const AppContextProvider = ({children})=> {

    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

//to fetch user data
    const fetchUser = async ()=> {
        setUser(dummyUserData)
        setSelectedChat(dummyChats[0])
    }

//ftech user chat
    const fetchUsersChats = async ()=> {
    setChats(dummyChats)
}

// to get the data of user
    useEffect(()=>{
        fetchUser()
    },[])

//to get the chat of user
    useEffect(()=>{
         if(user){
            fetchUsersChats()
         }
         else{
            setChats([])
            setSelectedChat(null)
         }
    },[user])


//for theme
    useEffect(()=>{
         if(theme === 'dark'){
            document.documentElement.classList.add('dark');
         }    
         else{
            document.documentElement.classList.remove('dark');
         }
    },[theme])   
    
    

    const value = {
        navigate,user,setUser,fetchUser,chats,setChats,selectedChat,setSelectedChat,theme,setTheme
    }

        return (
            <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
        )
}

export const useAppContext = ()=> useContext(AppContext)