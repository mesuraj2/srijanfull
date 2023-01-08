import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Router from 'next/router';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useToast } from '@chakra-ui/react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";



import Login from './login';

export default function Signup() {
  const {register,handleSubmit}=useForm()
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const [login, setlogin] = useState(false)
  const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

  const handleShowClick = () => setShowPassword(!showPassword);
  const submitForm=async (value)=>{
    // console.log(value)
    if(value.password != value.Cpassword){
      toast({
        title: "Password is not maching",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    else{
      const res =await fetch('/api/auth', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(value),
      })
      let data=await res.json()
      console.log(data)
      if(data.emailExits){
        toast({
          title: "Email already exits",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      else{
        toast({
          title: "Please check your email, verification has been send to your mail",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  }
  useEffect(() => {
    if(localStorage.getItem('token')!=null){
      Router.push('/')
    }
  }, [])
  return (
    <>
     
      {/* <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
          {/* Same as */}
          {/* <ToastContainer />  */}
      {/* <form onSubmit={handleSubmit(submitForm)}>
        <input type="text" placeholder='enter your name'  {...register('name',{required:{value:true,message:'name is required'},minLength:{
          value:8,
          message:'name must be greater than 8'

        }})}
        />
      <span>{errors?.name?.message}</span>
        {errors.name && <p>Last name is required.</p>}
        <input type="email" placeholder='enter your email' {...register('email')}/>
        <input type="password" placeholder='enter your password' {...register('password')}/>
        <button>submit</button>
      </form> */}
      {/* <form className='flex flex-col items-center items-center' onSubmit={handleSubmit(submitForm)}>
      <h1 className='text-2xl'>Signup form</h1>
        <input type="text" className='my-2' placeholder='enter your name' required {...register('name')}/>
        <input type="email" className='my-2' placeholder='enter your email' required {...register('email',)}/>
        <input type="password" className='my-2' placeholder='enter your password' required {...register('password')}/>
        <input type="password" className='my-2' placeholder='enter your conform password' required {...register('Cpassword')}/>
        <button>submit</button>
      </form> */}
    {login? <Login/>:
      <Flex
      flexDirection="column"
      
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit(submitForm)}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                  >
                    <CFaUserAlt color="gray.300" />
                    </InputLeftElement>
                  <Input type="text" placeholder="Name" required {...register('name')}/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                  >
                    <CFaUserAlt color="gray.300" />
                    </InputLeftElement>
                  <Input type="email" placeholder="email address" required {...register('email')}/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                  >
                    <CFaUserAlt color="gray.300" />
                    </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required {...register('password')}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                  >
                    <CFaUserAlt color="gray.300" />
                    </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Conform Password"
                    required {...register('Cpassword')}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Signup
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
      Already user?{' '}
        <Link color="teal.500" onClick={()=>setlogin(true)}>
          Sign in
        </Link>
      </Box>
    </Flex>
}
    </>
  )
}




