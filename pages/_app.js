import "../styles/globals.css";

import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import ChatProvider from "../Context/ChatProvider";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-2J1LECGN5B"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
  gtag('config', 'G-2J1LECGN5B', {
page_path: window.location.pathname,
});
`,
        }}
      />
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
            <Provider store={store}>
              {router.pathname !== "/404" && <Navbar />}
              <Component {...pageProps} />
              {router.pathname !== "/chat" && router.pathname !== "/404" && (
                <Footer />
              )}
            </Provider>
          </ChatProvider>
        </ChakraProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default MyApp;
