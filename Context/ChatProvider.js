import React, { createContext, useContext, useEffect, useState } from "react";
import Router, { useRouter } from 'next/router'
import  secureLocalStorage  from  "react-secure-storage";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const router = useRouter()
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState([]);
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [sess, setsess] = useState(false)
  const [city, setcity] = useState()
  const [latitude, setlatitude] = useState()
  const [longitude, setlongitude] = useState()

  useEffect(() => {
    const userInfo = JSON.parse(secureLocalStorage.getItem("user"));
    setUser(userInfo);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        sess,
        setsess,
        city,setcity,latitude,setlatitude,setlongitude,longitude
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};




export default ChatProvider;
