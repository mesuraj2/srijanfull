import { FormControl } from "@chakra-ui/form-control";

import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
// import "./styles.css";
import { Button, IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
// import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import secureLocalStorage from "react-secure-storage";

import io from "socket.io-client";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { ChatState } from "../Context/ChatProvider";
import ChatTyping from "./chatTyping";
import { useDispatch } from "react-redux";

import { addNotification } from "../redux/NotificationSlice";
// let socket2 // "https://talk-a-tive.herokuapp.com"; -> After deployment
const ENDPOINT = `http://localhost:3000/`; //["http://poolandsave.com","http://www.poolandsave.com/"]; //   "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [newMessage, setNewMessage] = useState("");
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

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
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

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // useEffect(() => {
  //   console.log(selectedChat)
  // }, [])
  // useEffect(() => {
  //   setUser(JSON.parse(secureLocalStorage.getItem('user')))
  //     const socket = io(ENDPOINT)
  //     socket.emit("setup", secureLocalStorage.getItem('id'));
  //     socket.on("connected", () => setSocketConnected(true));
  //     socket.on("typing", () => setIsTyping(true));
  //     socket.on("stop typing", () => setIsTyping(false));
  // }, [])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    socket = io(ENDPOINT);
    socket.emit("setup", secureLocalStorage.getItem("id"));
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    // eslint-disable-next-line
  }, []);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setNewMessage("");
        // console.log(selectedChat._id)
        const res = await fetch(`/api/message`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: newMessage,
            chatId: selectedChat._id,
          }),
        });
        let dat = await res.json();
        socket.emit("new message", dat);
        setMessages([dat, ...messages]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
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
    socket.on("message recieved", (newMessageRecieved) => {
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
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
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
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            d="flex"
            // gap="1rem"
            alignItems="center"
            justifyContent={"space-between"}
            display={"flex"}
            color="white"
            borderBottom="1px solid white"
          >
            <button className="btn" onClick={() => setSelectedChat("")}>
              <ArrowBackIcon />
            </button>
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
                  {selectedChat.chatName}
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
            // bg="rgba(185,233,252, .2)"
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
                <button className="btn" loading={loading2} onClick={makePage}>
                  Load MOre
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
              <div className="flex flex-row gap-2 items-center justify-center">
                <Input
                  variant="filled"
                  bg="white"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                  autoComplete="off"
                  sx={{
                    paddingY: 6,
                  }}
                />
                <button type="button" class="btn">
                  <span class="font-bold">Send</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="h-6 w-6 ml-2 transform rotate-90"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
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
            <p className="text-white text-center">Please select a chat</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleChat;
