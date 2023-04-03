import { FormControl } from "@chakra-ui/form-control";

import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
// import "./styles.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";
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
// let socket2 // "https://talk-a-tive.herokuapp.com"; -> After deployment
const ENDPOINT = "http://localhost:3000/"; //["http://poolandsave.com","http://www.poolandsave.com/"]; //   "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();

  const [page, setpage] = useState(1)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
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
      const config = {
        headers: {
          "auth-token": secureLocalStorage.getItem("token"),
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/allMessage/${selectedChat._id}?page=${page}`,
        config
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
  //   setUser(JSON.parse(secureLocalStorage.getItem('user')))
  //     const socket = io(ENDPOINT)
  //     socket.emit("setup", secureLocalStorage.getItem('id'));
  //     socket.on("connected", () => setSocketConnected(true));
  //     socket.on("typing", () => setIsTyping(true));
  //     socket.on("stop typing", () => setIsTyping(false));
  // }, [])

  useEffect(() => {
    setUser(JSON.parse(secureLocalStorage.getItem("user")));
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
            "auth-token": secureLocalStorage.getItem("token"),
          },
        };
        setNewMessage("");
        // console.log(selectedChat._id)
        const res = await fetch(`/api/message`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            "auth-token": secureLocalStorage.getItem("token"),
          },
          body: JSON.stringify({
            content: newMessage,
            chatId: selectedChat._id,
          }),
        });
        let dat = await res.json();
        socket.emit("new message", dat);
        setMessages([dat,...messages, ]);
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
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([newMessageRecieved,...messages]);
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

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
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
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
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
              <div className="messages">
                <ScrollableChat messages={messages} />
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
                  <ChatTyping/>
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
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
