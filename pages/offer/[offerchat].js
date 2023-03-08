import React from 'react'
import Router, { useRouter } from 'next/router'
import { useState,useEffect } from 'react'
import {useToast} from "@chakra-ui/react";
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,

} from "@chakra-ui/react"; 
import  secureLocalStorage  from  "react-secure-storage";
import { ChatState } from "../../Context/ChatProvider";
import {
  Badge,

  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,

  useColorModeValue,
} from '@chakra-ui/react';
import Auth from '../../components/auth'
import haversine from 'haversine-distance'


export default function Offerchat({Offerdetail}) {
  // console.log(Offerdetail.chat_id.Location.coordinates)
  const [firstChat, setfirstChat] = useState()
  const [currentLocation, setcurrentLocation] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter()
  const [chatid, setchatid] = useState()
  const toast = useToast();
  const [chatname, setchatname] = useState()
  const [coord, setcoord] = useState([])
  const {  setSelectedChat } =
  ChatState();
  const [token, settoken] = useState(false)
 
  useEffect(() => {
    if(secureLocalStorage.getItem('token')){
      settoken(false)
    }
  })

  useEffect(() => {
    setfirstChat((Offerdetail.chat_id.Location.coordinates).reverse())
    setcurrentLocation((JSON.parse(localStorage.getItem("coordinates"))).reverse())
  }, [])
  
  

  const Joinchat= async()=>{
    if(!secureLocalStorage.getItem('token')){
      // router.push("/Login")
      settoken(true)
    }else{
    const res =await fetch(`/api/chat/groupaddOffer`, {
        method: 'PUT', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'auth-token':secureLocalStorage.getItem('token')
        },
        body:JSON.stringify({userId:secureLocalStorage.getItem('id'),chatId:Offerdetail.chat_id}),
      })
      let data= await res.json()
      if(data.exits){
        toast({
        title: "User already exits",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      const res2 =await fetch(`/api/chat/fetchgroupChat`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'auth-token':secureLocalStorage.getItem('token')
        },
        body:JSON.stringify({ChatId:Offerdetail.chat_id}),
      })
      let data2= await res2.json()
      // console.log(data2)
      setSelectedChat(data2)
router.push({pathname:'/chat'})
      }
      else{
        toast({
        title: "successfull added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      const res2 =await fetch(`/api/chat/fetchgroupChat`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'auth-token':secureLocalStorage.getItem('token')
        },
        body:JSON.stringify({ChatId:Offerdetail.chat_id}),
      })
      let data2= await res2.json()
      // console.log(data2)
      setSelectedChat(data2)
      router.push({pathname:'/chat'})
      }
    }
  }
  
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const config = {
      headers: {
        'auth-token':secureLocalStorage.getItem('token'),
      },
    };
    const { data } = await axios.post(
      `/api/chat/offerchat`,
      {
        chatName: chatname,
        offerid:router.query.offerchat,
        coordinate: JSON.stringify([17.6140,78.0816]),
      },
      config
    );
    // console.log(data)
      toast({
        title: "successfull created",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      const res2 =await fetch(`/api/chat/fetchgroupChat`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'auth-token':secureLocalStorage.getItem('token')
        },
        body:JSON.stringify({ChatId:data._id}),
      })
      let data2= await res2.json()
      // console.log(data2)
      setSelectedChat(data2)
      // setInterval(function(){Router.push("/chat")},2000);
      router.push({pathname:'/chat'})
    setchatname("")
  }

  
  
  
  return (
    <>
    <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
           Form
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='enter your chat Name' value={chatname} onChange={(e) => setchatname(e.target.value)} />
            <button  onClick={onClose}>submit</button>
          </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w='77%'
        direction={{ base: 'column', md: 'row' }}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        padding={4}>
        <Flex flex={1} bg="blue.200" >
          <Image
            objectFit="cover"
            boxSize="100%"
            src={
              'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
            }
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}>
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {Offerdetail.offername}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
            {Offerdetail.Category && Offerdetail.Category}
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
           Description:-- {Offerdetail.Desc && Offerdetail.Desc}
          </Text>
          {
            firstChat && <div>{(haversine(currentLocation,firstChat))/1000}</div>
          }
          <Stack
            width={'100%'}
            mt={'2rem'}
            w='40%'
            direction={'row'}
            padding={2}
            justifyContent={'space-between'}
            alignItems={'center'}>
              {Offerdetail.chat_id? (
              
      <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              onClick={Joinchat}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}>
              {token? (<div><p>Click here to <Auth/></p></div>):"Join"}
            </Button>
            
    ):(<Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              onClick={onOpen}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}>
              Create chat
            </Button>)}
          </Stack>
        </Stack>
      </Stack>
    </Center>
    </>
    
  )
}

export async function getServerSideProps(context) {
  const res =await fetch(`http://localhost:3000/api/offer/offerdetail`, {
  // const res =await fetch(`https://poolandsave.com/api/offer/offerdetail`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({id:context.query.offerchat})
  })
  let data= await res.json()
  // console.log(data[0])
  return {
    props: { Offerdetail:data[0] }, // will be passed to the page component as props
  }
}
