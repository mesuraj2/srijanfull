// // import Head from 'next/head'
// // import Image from 'next/image'
// import { useState, useEffect } from "react";
// import Link from "next/link";
// // import styles from '../styles/Home.module.css'
// import Router from "next/router";
// import Offer from "../components/Offer";
// import secureLocalStorage from "react-secure-storage";
// import axios from "axios";
// import { ChatState } from "../Context/ChatProvider";
// import React from "react";
// import haversine from "haversine-distance";

// import ReactCrop from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";
// import { NextSeo } from "next-seo";
// import { Box, Circle, Flex, Heading, Select, Text, useToast } from "@chakra-ui/react";
// import { ImLocation2 } from "react-icons/im";
// import { BsFillCartCheckFill } from "react-icons/bs";
// import { BsFillChatDotsFill } from "react-icons/bs";
// import { MdLocalOffer } from "react-icons/md";
// import Carausal from "../components/Carausal";
// import OptionMenu from "../components/OptionMenu";
// import Offerdesign2 from "../components/offer/offerdesign2";
// import Lottie from "react-lottie-player";
// import cicle from "../animations/circle.json";

// export default function Index() {
//   const [imageupload, setimageupload] = useState();
//   const [Alloffer, setAlloffer] = useState([]);
//   const [Allchat, setAllchat] = useState([]);
//   //   const [latitude, setlatitude] = useState()
//   // const [longitude, setlongitude] = useState()
//   // const [city, setcity] = useState()
//   const toast = useToast();
//   const { city, latitude, longitude, setlatitude, setlongitude, setcity } =
//     ChatState();

//   const getpostion = async () => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setlatitude(position.coords.latitude);
//         setlongitude(position.coords.longitude);
//         let coordinate = [position.coords.latitude, position.coords.longitude];
//         localStorage.setItem("coordinates", JSON.stringify(coordinate));
//       },
//       (err) => console.log(err)
//     );

//     const { data } = await axios.get(
//       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//     );
//     setcity(data.city);
//   };
//   useEffect(() => {
//     getpostion();
//   }, []);
//   return (
//     <>
//       <NextSeo
//         title="Poolandsave"
//         description="We are trying to make bridge for connectiong more people together. if they want more people to avail a particular offer then they can pool offer here. we will make a chat thread and they can chat there and can buy it"
//       />
//       <main>
//         <OptionMenu />
//         {/* <Lottie
//           loop
//           animationData={cicle}
//           play
//           style={{ width: 150, height: 150 }}
//         /> */}
//         <Carausal />
//         <Box
//           textAlign={"center"}
//           mt="2rem"
//           boxSizing="border-box"
//           paddingY={"1rem"}
//         >
//           <Heading color={"red"} fontSize="1.5rem" fontWeight={"normal"}>
//             OUR CATEGORIES
//           </Heading>
//           <Text width={"65%"} m="auto">
//             We are having a vast variety of products that you can choose from.
//             We provide shopping accessories like groceries, wears for men, women
//             and children, shoes, fashion accessories, etc. we also update
//             regular offers for our customers for our wide variety of products.
//           </Text>
//         </Box>
//         <Offerdesign2 />
//       </main>
//     </>
//   );
// }
