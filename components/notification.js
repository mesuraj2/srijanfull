import { getCookie } from "cookies-next";
import React from "react";
import secureLocalStorage from "react-secure-storage";
import io from "socket.io-client";
import { ChatState } from "../Context/ChatProvider";
import { useEffect } from "react";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";

const ENDPOINT = `http://localhost:3000/`; //["http://poolandsave.com","http://www.poolandsave.com/"]; //   "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket;
import { useRouter } from "next/router";

export default function Notification() {
  const [socketConnected, setSocketConnected] = useState(false);
  const { notification, setNotification, setSelectedChat } = ChatState();
  const router = useRouter();
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
        console.log(newMessageRecieved, "from newChatNotification");
        setNotification([newMessageRecieved, ...notification]);
      });
    }
  });

  const joinChat = async (id) => {
    // console.log(id, "from join chat in notification");
    const res2 = await fetch(`/api/chat/fetchgroupChat`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ChatId: id }),
    });
    let data2 = await res2.json();
    // console.log(data2)
    setSelectedChat(data2);
    router.push({ pathname: "/chat" });
  };

  return (
    <Menu>
      <MenuButton p={1}>
        {/* <NotificationBadge
        count={notification.length}
        effect={Effect.SCALE}
      /> */}

        <BellIcon fontSize="2xl" m={1} />
        <div className="badge">{notification.length}</div>
      </MenuButton>
      <MenuList pl={2}>
        {!notification.length && "No New Messages"}
        {notification.map((notif, index) => (
          <div className="bg-white p-5 rounded-2xl">
            <div className="flex flex-col ">
              <div className="flex flex-row items-center justify-between">
                <p>Chat Name</p>
                <p>10:45 PM</p>
              </div>
              <div className="flex flex-row items-center gap-3">
                <p className="w-[12rem] truncate">
                  {notif.Message}
                  {index}
                </p>
                <button className="btn" onClick={() => joinChat(notif.offerid)}>
                  Join Chat
                </button>
              </div>
            </div>
          </div>
        ))}
      </MenuList>
    </Menu>
  );
}
