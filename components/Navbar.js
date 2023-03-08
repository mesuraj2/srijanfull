import Link from 'next/link'
import Router from 'next/router'

import { ChatState } from "../Context/ChatProvider";
import Auth from './auth'

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
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon,SearchIcon } from '@chakra-ui/icons';

import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';

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
    <header>
      <Box bg={'black'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box color={'white'} ml='3rem' width={'12vw'}><Link href='/'>Pool & Save</Link></Box>
            <InputGroup width={'55%'}>
            <InputLeftAddon borderTopLeftRadius={'20px'} borderBottomLeftRadius='20px' bgColor={'white'}><SearchIcon/></InputLeftAddon>
              <Input type="text" bgColor={'white'} placeholder='Search for Products...'/>
              <InputRightAddon borderTopRightRadius={'20px'} borderBottomRightRadius='20px' bgColor={'#DD2D4A'} color='white'>All</InputRightAddon>
              </InputGroup>
          </HStack>
          <Flex alignItems={'center'}>
          <Text color={'white'} width='19vw' as='u'>How can we be helpful to you ?</Text>
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
                    user.pic ? user.pic:"data:image/jpeg;base64,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"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem><ProfileModal user={user}/></MenuItem>
              <MenuItem as={motion.button} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:2}} onClick={logoutHandler}>Logout</MenuItem>
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
    </header>
  );
}