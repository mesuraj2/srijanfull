import { FormControl } from '@chakra-ui/form-control';

import { Input } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
// import "./styles.css";
import { Button, IconButton, Spinner, useToast } from '@chakra-ui/react';
import { getSender, getSenderFull } from '../config/ChatLogics';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ProfileModal from './miscellaneous/ProfileModal';
import ScrollableChat from './ScrollableChat';
// import Lottie from "react-lottie";
import animationData from '../animations/typing.json';
import secureLocalStorage from 'react-secure-storage';

import io from 'socket.io-client';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import { ChatState } from '../Context/ChatProvider';
import ChatTyping from './chatTyping';
import { useDispatch } from 'react-redux';

import { addNotification } from '../redux/NotificationSlice';
// let socket2 // "https://talk-a-tive.herokuapp.com"; -> After deployment
const ENDPOINT = `http://localhost:3000/`; //["http://poolandsave.com","http://www.poolandsave.com/"]; //   "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [page, setpage] = useState(1);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const {
    selectedChat,
    setSelectedChat,
    user,
    setUser,
    notification,
    setNotification,
  } = ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const { data } = await axios.get(
        `/api/message/allMessage/${selectedChat._id}?page=${page}`
      );
      setMessages(data);
      setLoading(false);

      socket.emit('join chat', selectedChat._id);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Messages',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };
  // useEffect(() => {
  //   setUser(JSON.parse(secureLocalStorage.getItem('user')))
  //     const socket = io(ENDPOINT)
  //     socket.emit("setup", secureLocalStorage.getItem('id'));
  //     socket.on("connected", () => setSocketConnected(true));
  //     socket.on("typing", () => setIsTyping(true));
  //     socket.on("stop typing", () => setIsTyping(false));
  // }, [])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
    socket = io(ENDPOINT);
    socket.emit('setup', secureLocalStorage.getItem('id'));
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
    // eslint-disable-next-line
  }, []);

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      socket.emit('stop typing', selectedChat._id);
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
        setNewMessage('');
        // console.log(selectedChat._id)
        const res = await fetch(`/api/message`, {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: newMessage,
            chatId: selectedChat._id,
          }),
        });
        let dat = await res.json();
        socket.emit('new message', dat);
        setMessages([dat, ...messages]);
      } catch (error) {
        toast({
          title: 'Error Occured!',
          description: 'Failed to send the Message',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
      }
    }
  };

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          // console.log(newMessageRecieved.chat);
          // setNotification([newMessageRecieved, ...notification]);
          dispatch(
            addNotification({
              chat: newMessageRecieved.chat,
            })
          );
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([newMessageRecieved, ...messages]);
      }
    });
  });
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const makePage = async () => {
    setLoading2(true);
    const { data } = await axios.get(
      `/api/message/allMessage/${selectedChat._id}?page=${page + 1}`
    );
    setMessages([...messages, ...data]);
    setLoading2(false);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Box
            fontSize={{ base: '28px', md: '30px' }}
            pb={3}
            px={2}
            w="100%"
            d="flex"
            alignItems="center"
            display={'flex'}
          >
            <IconButton
              d={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat('')}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <div className="flex flex-row">
                  <p className="mx-5">{getSender(user, selectedChat.users)}</p>
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </div>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Box>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="rgba(185,233,252, .2)"
            w="100%"
            h="91%"
            borderRadius="lg"
            overflowY="scroll"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="flex flex-col ">
                <button
                  className="btn btn-outline"
                  loading={loading2}
                  onClick={makePage}
                >
                  Load More
                </button>
                <ScrollableChat messages={messages} />
                <div ref={messagesEndRef} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  {/* <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  /> */}
                  <ChatTyping />
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
                autoComplete="off"
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page

        <div className="w-full h-full relative ">
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <img
              src="https://media.giphy.com/media/gwuuaOAadXMp2JdHET/giphy.gif"
              alt="message icon"
            />
            <p className="text-gray-500 text-center">Please select a chat</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleChat;
