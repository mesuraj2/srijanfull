import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/menu';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/modal';
import { Tooltip } from '@chakra-ui/tooltip';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Avatar } from '@chakra-ui/avatar';
// import { useHistory } from "react-router-dom";
import Router from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import ChatLoading from './ChatLoading';
import { Spinner } from '@chakra-ui/spinner';
import ProfileModal from './miscellaneous/ProfileModal';
// import NotificationBadge from "react-notification-badge";
// import { Effect } from "react-notification-badge";
import { getSender } from '../config/ChatLogics';
import UserListItem from './userAvatar/UserListItem';
import { ChatState } from '../Context/ChatProvider';
import secureLocalStorage from 'react-secure-storage';
import { AiOutlineSearch } from 'react-icons/ai';

function SideDrawer() {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const history = useHistory();

  // const logoutHandler = () => {
  //   secureLocalStorage.removeItem("token");
  //   Router.push("/");
  // };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please Enter something in search',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/auth/searchUser?search=${search}`, {
        method: 'GET', // or 'PUT'
        headers: {
          // 'Content-Type': 'application/json',
          'auth-token': secureLocalStorage.getItem('token'),
        },
      });
      let data = await res.json();
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Search Results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  const accessChat = async (userId) => {
    // console.log(userId);

    try {
      setLoadingChat(true);
      const res = await fetch(`/api/chat`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'auth-token': secureLocalStorage.getItem('token'),
        },
        body: JSON.stringify({ UserId: userId }),
      });
      let data = await res.json();
      // console.log(data)
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: 'Error fetching the chat',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  return (
    <>
      <Box
        d="flex"
        className="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="10px"
        sx={{
          borderRadius: '.5rem',
        }}
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <div>
              <div className="flex flex-row gap-2 items-center justify-center">
                <AiOutlineSearch />
                <i className="fas fa-search font-[300] text-gray-500">
                  Search Users
                </i>
              </div>
            </div>
          </Button>
        </Tooltip>
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
            {!notification.length && 'No New Messages'}
            {notification.map((notif) => (
              <MenuItem
                key={notif._id}
                onClick={() => {
                  setSelectedChat(notif.chat);
                  setNotification(notification.filter((n) => n !== notif));
                }}
              >
                {notif.chat.isGroupChat
                  ? `New Message in ${notif.chat.chatName}`
                  : `New Message from ${getSender(user, notif.chat.users)}`}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            sx={{
              fontWeight: 400,
              color: 'rgba(0, 0, 0, 0.5)',
              backgroundColor: '#B9E9FC',
            }}
          >
            Search Users
          </DrawerHeader>
          <DrawerBody sx={{ border: '5px solid #B9E9FC' }}>
            <Box
              sx={{
                display: 'flex',
                gap: '5px',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn" onClick={handleSearch}>
                Go
              </button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
