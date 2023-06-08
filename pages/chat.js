import { useState, useEffect } from 'react';
import { ChatState } from '../Context/ChatProvider';
import Router from 'next/router';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/SideDrawer';
import MyChats from '../components/MyChats';
import Chatbox from '../components/Chatbox';
import secureLocalStorage from 'react-secure-storage';
import { getCookie, deleteCookie } from 'cookies-next';
import { NextSeo } from 'next-seo';
import NavbarT2 from '../components/NavbarT2';
import Footer from '../components/FooterT2';

export default function Chat() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  useEffect(() => {
    if (getCookie('authtoken') == null && getCookie('authtoken') == undefined) {
      Router.push('/');
    }
  }, []);

  return (
    <div className="bg-[#B9E9FC] h-screen mx-auto  ">
      <NextSeo title="Chat" description="This is user Chat Page" />
      <div className="">
        <div className="w-[100vw]  13xl:w-[80rem] mx-auto 11xl:pt-5">
          {/* {<SideDrawer />} */}
          <Box
            className="flex"
            justifyContent="center"
            w="100%"
            h={{ base: '100vh', md: '93.5vh' }}
            p={{ base: '0', md: '10px 0' }}
          >
            {<MyChats fetchAgain={fetchAgain} />}

            {<Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
          </Box>
        </div>
      </div>
    </div>
  );
}
