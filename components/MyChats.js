import { AddIcon } from '@chakra-ui/icons';
import { Box, Stack, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getSender } from '../config/ChatLogics';
import ChatLoading from './ChatLoading';
import GroupChatModal from './miscellaneous/GroupChatModal';
import { Avatar, Button } from '@chakra-ui/react';
import { ChatState } from '../Context/ChatProvider';
import secureLocalStorage from 'react-secure-storage';
import Router from 'next/router';
import { ClassNames } from '@emotion/react';
import { getCookie, deleteCookie } from 'cookies-next';

export default function MyChats({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState([]);

  const { selectedChat, setSelectedChat, user, chats, setChats, Session } =
    ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const res = await fetch('/api/chat/fetchChat', {
        method: 'GET', // or 'PUT'
      });
      let data = await res.json();
      // console.log(data)
      setChats(data);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the chats',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('user')));
    if (
      getCookie('authtoken') !== null &&
      getCookie('authtoken') !== undefined
    ) {
      fetchChats();
    }
  }, [fetchAgain]);
  return (
    <Box
      // d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      className={selectedChat ? 'selecof' : 'selecon'}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: '100%', md: '31%' }}
      borderRadius="lg"
      // borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: '28px', md: '30px' }}
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          color: 'rgba(0, 0, 0, 0.7)',
        }}
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: '17px', md: '10px', lg: '17px' }}
            sx={{
              fontWeight: '400',
            }}
            rightIcon={<AddIcon sx={{ fontSize: '.8rem' }} />}
            ml="10px"
          >
            Create Group
          </Button>
        </GroupChatModal>
      </Box>
      <div className="bg-[#b9e9fc]/20">
        {chats ? (
          <div className="flex flex-col w-full py-5 overflow-y-scrol ">
            {chats &&
              chats.map((chat) => (
                <div
                  onClick={() => setSelectedChat(chat)}
                  key={chat._id}
                  className="border-b border-black/10 cursor-pointer py-2 px-2 hover:bg-[#b9e9fc]/40"
                >
                  <div className="flex items-center justify-centr">
                    <Avatar
                      mr={2}
                      size="sm"
                      cursor="pointer"
                      name={user.name}
                      src={user.pic}
                    />

                    <div className="flex flex-col w-full">
                      <div className="flex flex-row justify-between w-full">
                        <p>
                          {!chat.isGroupChat
                            ? getSender(loggedUser, chat.users)
                            : chat.chatName}
                        </p>
                        <p className="text-gray-500 text-[.8rem]">18:14</p>
                      </div>

                      <div>
                        {chat.latestMessage && (
                          <div className="flex justify-start items-center pb-2 gap-1">
                            <p className="text-gray-500 text-[.8rem]">
                              {chat.latestMessage.sender.name}:{' '}
                            </p>
                            <p className="text-gray-500 text-[.8rem]">
                              {chat.latestMessage.content.length > 50
                                ? chat.latestMessage.content.substring(0, 51) +
                                  '...'
                                : chat.latestMessage.content}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </Box>
  );
}

{
  /* <b>{chat.latestMessage.sender.name} : </b> */
}

// cursor="pointer"
// bg={selectedChat === chat ? '#38B2AC' : 'white'}
// color={selectedChat === chat ? 'white' : 'black'}
// sx={{
//   backgroundColor: 'white',
//   padding: '10px',
//   // margin: '10px 0',
//   borderRadius: '5px',
//   boxShadow: 'rgba(0, 0, 0, 0.18) 0px 2px 4px',
// }}
