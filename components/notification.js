import { getCookie } from "cookies-next";
import React from "react";
import secureLocalStorage from "react-secure-storage";
import io from "socket.io-client";
import { ChatState } from "../Context/ChatProvider";
import { useEffect } from "react";
import { useState } from "react";

const ENDPOINT = `http://localhost:3000/`; //["http://poolandsave.com","http://www.poolandsave.com/"]; //   "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket;

export default function Notification() {
  const [socketConnected, setSocketConnected] = useState(false);
  const { notification, setNotification } = ChatState();

  useEffect(() => {
    if (getCookie("authtoken")) {
      socket = io(ENDPOINT);
      socket.emit("setup", secureLocalStorage.getItem("id"));
      socket.on("connected", () => setSocketConnected(true));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (getCookie("authtoken")) {
    socket.on("newChatNotification", (newMessageRecieved) => {
      console.log(newMessageRecieved,'from newChatNotification')
      setNotification([newMessageRecieved, ...notification]);
  });
}
})

  return <div></div>;
}
