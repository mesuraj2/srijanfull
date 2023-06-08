import React, { useState, useEffect } from "react";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";

const UserPanel = ({ setsignedin }) => {
  const router = useRouter();
  // const [userimage, setuserimage] = useState('');
  const { user, setUser, notification, setNotification,setSelectedChat } = ChatState();

  // const getUser = async () => {
  //   const res = await axios.get('http://localhost:3000/api/auth/getUser');
  //   setuserimage(res.data.pic);
  // }

  const handleLogout = () => {
    deleteCookie("authtoken");
    setsignedin(false);
    router.push("/");
  };

  // useEffect(() => {
  //   getUser();
  // }, []);

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
    <div>
      <div className="flex items-center justify-center gap-2">
        {/* <button className="btn btn-outline">Your offers</button> */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
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
                // <MenuItem
                //   key={notif._id}
                //   onClick={() => {
                //     setSelectedChat(notif.chat);
                //     setNotification(notification.filter((n) => n !== notif));
                //   }}
                // >
                //   {notif.chat.isGroupChat
                //     ? `New Message in ${notif.chat.chatName}`
                //     : `New Message from ${getSender(user, notif.chat.users)}`}
                // </MenuItem>
                <div key={index}>
                  <p>{notif.Message}{index}</p>
                  <button onClick={() => joinChat(notif.offerid)}>
                    join Chat
                  </button>
                </div>
              ))}
            </MenuList>
          </Menu>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
            <div className="w-10 rounded-full ">
              <img
                src={
                  user
                    ? user.pic
                    : "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png"
                }
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="#" className="justify-between">
                Profile
                {/* <span className="badge">New</span> */}
              </Link>
            </li>
            <li>
              <Link href="/chat">Chat Room</Link>
            </li>
            <li>
              <Link href="#">Notifications</Link>
            </li>
            <li>
              <Link href="#">Your Cart</Link>
            </li>
            <li>
              <Link href="#">Settings</Link>
            </li>
            <li>
              <Link legacyBehavior href="/">
                <a onClick={handleLogout}>Logout</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
