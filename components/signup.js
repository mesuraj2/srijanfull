import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";
import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useToast } from "@chakra-ui/react";
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
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

import Login from "./login";
import { GoogleLogin } from "@react-oauth/google";


export default function Signup() {
  const toast =useToast()

  const onSuccess=async (response)=>{
    console.log(response.credential)
    const {data}=await axios.post('/api/auth/google',{
      tokenid:response.credential
    })
    // console.log(data)
    if(data.token){
      toast({
        title: "successfully created",
        status: "success ",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  }
  return (
    <>
      <div>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
      
      
      {/* <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form >
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaUserAlt color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type="text"
                      placeholder="Name"
                      required
                      {...register("name")}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaUserAlt color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type="email"
                      placeholder="email address"
                      required
                      {...register("email")}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaUserAlt color="gray.300" />
                    </InputLeftElement>
                    <input
                      type="file"
                      accept="image/jpeg"
                      onChange={(event) => {
                        setimageupload(event.target.files[0]);
                      }}
                    />
                    <button onClick={uploadImg}> upload file</button>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="gray.300">
                      <CFaUserAlt color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      {...register("password")}
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
                    <InputLeftElement pointerEvents="none" color="gray.300">
                      <CFaUserAlt color="gray.300" />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Conform Password"
                      required
                      {...register("Cpassword")}
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
          Already user?{" "}
          <Link color="teal.500" onClick={() => setlogin(true)}>
            Sign in
          </Link>
        </Box>
      </Flex> */}
    </>
  );
}
