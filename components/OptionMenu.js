import React from "react";
import { Box, Flex, Heading, Select, Text, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { BsFillCartCheckFill, BsFillChatDotsFill } from "react-icons/bs";
import { ChatState } from "../Context/ChatProvider";
import { ImLocation2 } from "react-icons/im";
import { MdLocalOffer } from "react-icons/md";

export default function OptionMenu() {
  const { city, latitude, longitude, setlatitude, setlongitude, setcity } =
    ChatState();
  return (
    <Flex justifyContent={"flex-end"} alignItems="center" height={"64px"}>
      <Box display={"flex"} alignItems="center" mr={"1rem"}>
        <Link href={"/chat"}>
          <BsFillChatDotsFill size={20} />
        </Link>
        <Link href={"/chat"}>
          <Text ml={"0.5rem"}>Chat</Text>
        </Link>
      </Box>
      <Box display={"flex"} alignItems="center" mr={"1rem"}>
        <ImLocation2 size={20} />
        <div className="group inline-block relative">
          <button className=" py-2 px-2 rounded inline-flex items-center">
            <span className="mr-1">Dropdown</span>
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>
          <ul className="absolute hidden z-10 text-gray-700 pt-1 group-hover:block">
            <li className="">
              <a
                className="rounded-t bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
              >
                One
              </a>
            </li>
            <li className="">
              <a
                className="bg-white hover:bg-gray-400 py-2 px-6 block whitespace-no-wrap"
                href="#"
              >
                Two
              </a>
            </li>
            <li className="">
              <a
                className="rounded-b bg-white hover:bg-gray-400 py-2 px-4 block "
                href="#"
              >
                Three is the magic number
              </a>
            </li>
          </ul>
        </div>
      </Box>
      <Box display={"flex"} alignItems="center" mr={"1rem"}>
        <BsFillCartCheckFill size={20} />
        <Text ml={"0.5rem"}>Cart Items</Text>
      </Box>
      <Box display={"flex"} alignItems="center" mr={"1rem"}>
        <MdLocalOffer size={20} />
        <Link
          style={{ marginleft: "0.5rem" }}
          className="ml-2"
          href={`/categoryOfferDetail?category=cloth&lat=${latitude}&long=${longitude}`}
        >
          offer
        </Link>
      </Box>
    </Flex>
  );
}
