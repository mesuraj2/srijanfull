import { useState, useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import Router from "next/router";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/SideDrawer";
import MyChats from "../components/MyChats";
import Chatbox from "../components/Chatbox";
import secureLocalStorage from "react-secure-storage";
import { getCookie, deleteCookie } from "cookies-next";
import { NextSeo } from "next-seo";

export default function Chat() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  useEffect(() => {
    if (getCookie("authtoken") == null && getCookie("authtoken") == undefined) {
      Router.push("/");
    }
  }, []);

  return (
    <>
    <NextSeo
        title="Chat"
        description="This is user Chat Page"
      />
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        className="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
    </>
  );
}
