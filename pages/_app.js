import '../styles/globals.css';

import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import FooterT2 from '../components/FooterT2';
import ChatProvider from '../Context/ChatProvider';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Script from 'next/script';
import NavbarT2 from '../components/NavbarT2';

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
      <GoogleOAuthProvider clientId="105287248693-sikcvtd0ucchi4r7g2gbceoophnmadjr.apps.googleusercontent.com">
        <ChakraProvider>
          <ChatProvider>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </Head>
            <NextNProgress color={'#E0425C'} />
            <Provider store={store}>
              <div className="w-screen bg-[#B9E9FC]">
                <div className="mx-auto">
                  {router.pathname !== '/404' &&
                    router.pathname !== '/chat' &&
                    router.pathname !== '/login' && <NavbarT2 />}

                  <Component {...pageProps} />
                </div>
                {router.pathname !== '/404' &&
                  router.pathname !== '/chat' &&
                  router.pathname !== '/login' && <FooterT2 />}
              </div>
            </Provider>
          </ChatProvider>
        </ChakraProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default MyApp;
