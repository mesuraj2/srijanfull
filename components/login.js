import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import secureLocalStorage from "react-secure-storage";
import { ChatState } from "../Context/ChatProvider";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
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

import Signup from "./signup";
import axios from "axios";

export default function Login({ onClose }) {
  const { register, handleSubmit } = useForm();
  const [signup, setsignup] = useState(false);
  const { setUser, setsess } = ChatState();
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const loginsubmitForm = async (value) => {
    // const {data}=await axios.post("/api/auth/login",{
    //   value
    // })
    const res = await fetch("/api/auth/login", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    const data = await res.json();
    console.log(data);
    if (data.success == false) {
      toast({
        title: "Incorect credientals",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      secureLocalStorage.setItem("id", data._id);
      localStorage.setItem("user", JSON.stringify(data));
      setsess(true);
      setUser(data);
      onClose();
    }
  };

  const onSuccess = async (response) => {
    console.log(response);
    const { data } = await axios.post("/api/auth/google", {
      tokenid: response.credential,
    });
    secureLocalStorage.setItem("id", data._id);
    localStorage.setItem("user", JSON.stringify(data));
    setsess(true);
    setUser(data);
    onClose();
  };

  return (
    <>
      {signup ? (
        <Signup />
      ) : (
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
              <form onSubmit={handleSubmit(loginsubmitForm)}>
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
                        type="email"
                        placeholder="email address"
                        required
                        {...register("email")}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.300">
                        <CFaLock color="gray.300" />
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
                    <FormHelperText textAlign="right">
                      <Link>forgot password?</Link>
                    </FormHelperText>
                  </FormControl>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Login
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
          <Box>
            New to us?{" "}
            <Link color="teal.500" onClick={() => setsignup(true)}>
              Sign Up
            </Link>
          </Box>
          <GoogleLogin
            onSuccess={onSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </Flex>
      )}
    </>
  );
}
