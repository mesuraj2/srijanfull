import Link from "next/link";
import Router from "next/router";

import { ChatState } from "../Context/ChatProvider";
import Auth from "./auth";

import secureLocalStorage from "react-secure-storage";

import ProfileModal from "./miscellaneous/ProfileModal";

import { ReactNode } from "react";
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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { getCookie, deleteCookie } from "cookies-next";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { user, setUser, sess, setsess } = ChatState();
  const cart = useSelector((state) => state.cart);


  console.log(cart)
  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  useEffect(() => {
    if (
      getCookie("authtoken") !== null &&
      getCookie("authtoken") !== undefined
    ) {
      setsess(true);
    } else {
      setsess(false);
    }
  });
  useEffect(() => {
    if (
      getCookie("authtoken") !== null &&
      getCookie("authtoken") !== undefined
    ) {
      const usr = JSON.parse(localStorage.getItem("user"));
      setUser(usr);
    }
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const logoutHandler = () => {
    deleteCookie("authtoken");
    setsess(false);
    Router.push("/");
  };
  return (
    <header>
      <Box bg={"black"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          /> */}
          <HStack spacing={8} alignItems={"center"}>
            <Box color={"white"} ml="3rem" width={"12vw"}>
              <Link href="/">Pool & Save</Link>
            </Box>
            <InputGroup width={"55%"}>
              <InputLeftAddon
                borderTopLeftRadius={"20px"}
                borderBottomLeftRadius="20px"
                bgColor={"white"}
              >
                <SearchIcon />
              </InputLeftAddon>
              <Input
                type="text"
                bgColor={"white"}
                placeholder="Search for Products..."
              />
              <InputRightAddon
                borderTopRightRadius={"full"}
                borderBottomRightRadius="full"
                bgColor={"#dd2d4a"}
                color="white"
                border={"none"}
              >
                All
              </InputRightAddon>
            </InputGroup>
          </HStack>
          <Flex alignItems={"center"}>
            <Text color={"white"} width="19vw" as="u">
              How can we be helpful to you ?
            </Text>
            <Menu>
              {sess ? (
                <>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={user.pic} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <ProfileModal user={user} />
                    </MenuItem>
                    <MenuItem
                      as={motion.button}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2 }}
                      onClick={logoutHandler}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </>
              ) : (
                <Auth />
              )}
            </Menu>
          </Flex>
        </Flex>
        {/* <div className="text-white">suraj</div>
        {
          getTotalQuantity && <div className="text-white">{getTotalQuantity}</div>
        } */}
        {/* {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link href="/">Home</Link>
              <Link href="#">about</Link>
              <Link href="#">contect</Link>
              <Link href="/chat">Chat</Link>
            </Stack>
          </Box>
        ) : null} */}
      </Box>
    </header>
  );
}
