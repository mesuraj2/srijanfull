import '../styles/globals.css'
import Head from "next/head";
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import ChatProvider from "../Context/ChatProvider";
import { useRouter } from "next/router";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
  
  return  (<>
  <ChakraProvider>
  <ChatProvider >
<Head>
   <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>
<Navbar />
<Component {...pageProps} />
  {router.pathname !== "/chat"  && <Footer />}
</ChatProvider>
</ChakraProvider>
  </>
  )
}


export default MyApp
