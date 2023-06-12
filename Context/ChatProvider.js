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
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setUser(userInfo);

    
    if(localStorage.getItem("coordinates")){
      let coordinate=JSON.parse(localStorage.getItem("coordinates"))
      setlatitude(coordinate[0])  
      setlongitude(coordinate[1])
    }
    else{
      navigator.geolocation.getCurrentPosition(
        position => { 
          setlatitude(position.coords.latitude)
          setlongitude(position.coords.longitude)
          let coordinate=[position.coords.latitude,position.coords.longitude]
          localStorage.setItem("coordinates",JSON.stringify(coordinate))
        }, 
        err => console.log(err)
      );
    }
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
