// import React, { useEffect, useState } from 'react'
// import { Grid, GridItem } from '@chakra-ui/react'
import Link from 'next/link'
import Router from 'next/router'
// import  secureLocalStorage  from  "react-secure-storage";
import { ChatState } from "../Context/ChatProvider";
import Auth from './auth'
// import {
//   Menu,
//   MenuButton,
//   MenuDivider,
//   MenuItem,
//   MenuList,
// } from "@chakra-ui/menu";
// import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
// import { Button } from "@chakra-ui/button";
// import { Avatar } from "@chakra-ui/avatar";
// import ProfileModal from "./miscellaneous/ProfileModal";

// function Navbar() {
//   const {
//     setSelectedChat,
//     user,
//     notification,
//     setNotification,
//     chats,
//     setChats,
//     setSession,
//     Session
//   } = ChatState();
//     const [local, setlocal] = useState()
//   useEffect(() => {
//     if (secureLocalStorage.getItem("token") != null) {
//       setSession(true);
//     } else {
//       setSession(false);
//     }
//   });
  // const logoutHandler = () => {
  //   secureLocalStorage.removeItem("token");
  //   Router.push("/");
  // };

//   return (
// <Grid templateColumns='repeat(5, 1fr)' gap={6}>
//   <GridItem w='100%' h='10' bg='blue.500' />
//   <GridItem w='100%' h='10' bg='blue.500' />
//   <GridItem w='100%' h='10' bg='blue.500' />
//   {/* <GridItem>{user && user.user.name}</GridItem>   */}
//   {/* {local? (<GridItem ><button onClick={logout}>logout</button></GridItem>):(<GridItem ><Link href="/Login">Login</Link></GridItem>) } */}
//   {
//     Session? (<div>
//       <Menu>
//         <MenuButton p={1}>
//           {/* <NotificationBadge
//             count={notification.length}
//             effect={Effect.SCALE}
//           /> */}
//           <div>{notification.length}</div>
//           <BellIcon fontSize="2xl" m={1} />
//         </MenuButton>
//         <MenuList pl={2}>
//           {!notification.length && "No New Messages"}
//           {notification.map((notif) => (
//             <MenuItem
//               key={notif._id}
//               onClick={() => {
//                 setSelectedChat(notif.chat);
//                 setNotification(notification.filter((n) => n !== notif));
//               }}
//             >
//               {notif.chat.isGroupChat
//                 ? `New Message in ${notif.chat.chatName}`
//                 : `New Message from ${getSender(user, notif.chat.users)}`}
//             </MenuItem>
//           ))}
//         </MenuList>
//       </Menu>
//       <Menu>
//         <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
//           <Avatar
//             size="sm"
//             cursor="pointer"
//             name={user.name}
//             src={user.pic}
//           />
//         </MenuButton>
//         <MenuList>
//           <ProfileModal user={user}>
//             <MenuItem>My Profile</MenuItem>{" "}
//           </ProfileModal>
//           <MenuDivider />
//           <MenuItem onClick={logoutHandler}>Logout</MenuItem>
//         </MenuList>
//       </Menu>
//     </div>):(
//   <Link href="Login">login</Link>
//     )
//   }

// </Grid>
//   )
// }

// export default Navbar
import  secureLocalStorage  from  "react-secure-storage";

import ProfileModal from './miscellaneous/ProfileModal';

import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { useState,useEffect } from 'react';

export default function Navbar() {
  // const [sess, setsess] = useState(false)
    const {
    user,
    setUser,
    sess,
    setsess
  } = ChatState();
  useEffect(() => {
    if(secureLocalStorage.getItem('token')){
      setsess(true)
    }
   })
  useEffect(() => {
    if(secureLocalStorage.getItem('token')){
    setUser(JSON.parse(localStorage.getItem('user')))
    }
   },[]) 

  const { isOpen, onOpen, onClose } = useDisclosure();
  const logoutHandler = () => {
    secureLocalStorage.removeItem("token");
    setsess(false)
    Router.push("/");
  };
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box><Link href='/'>Pool & Save</Link></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <Link href='/'>Home</Link>
              <Link href='#'>about</Link>
              <Link href='#'>contect</Link>
              <Link href='/chat'>Chat</Link>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              {sess?(
                <>
                <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    user.pic
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem><ProfileModal user={user}/></MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
              </>
              ):(
                // <Link href='/Login'>Login</Link>
               <Auth />
              )}
            </Menu>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            <Link href='/'>Home</Link>
              <Link href='#'>about</Link>
              <Link href='#'>contect</Link>
              <Link href='/chat'>Chat</Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}