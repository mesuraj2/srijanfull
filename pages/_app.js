import "../styles/globals.css";

import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import ChatProvider from "../Context/ChatProvider";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { GoogleOAuthProvider } from "@react-oauth/google";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <GoogleOAuthProvider clientId="84972645868-7kfs4978rt0un3mc26lt44at4o98ihej.apps.googleusercontent.com">
        <ChakraProvider>
          <ChatProvider>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </Head>
            <NextNProgress color={"#E0425C"} />
            {router.pathname !== "/404" && <Navbar />}
            <Component {...pageProps} />
            {router.pathname !== "/chat" && router.pathname !== "/404" && <Footer />}
          </ChatProvider>
        </ChakraProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default MyApp;
