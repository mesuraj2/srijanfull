// import React from "react";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { ChatState } from "../../Context/ChatProvider";

// import Offerdesign1 from "./offerdesign1";
// import Offerdesign2 from "./offerdesign2";
// import Carausal from "./carausal";
// import Image from "next/image";
// import {
//   Box,
//   Center,
//   Heading,
//   Text,
//   Stack,
//   Avatar,
//   Flex,
//   Spacer,
// } from "@chakra-ui/react";
// import { Grid, GridItem } from "@chakra-ui/react";

// // export default function blogPostWithImage() {
// //   return (

// //   );
// // }

// export default function Alloffer({ totaloffer }) {
//   const { city, latitude, longitude, setlatitude, setlongitude, setcity } =
//     ChatState();
//   return (
//     <>
//     <Offerdesign1/>
//       {/* <div className="Offerdesign"> */}
//         {/* <Text fontSize="30px" textAlign={"center"} p="6px" fontWeight="600">
//           OfferDesign2
//           <Link
//             href={`/categoryOfferDetail?category=cloth&lat=${latitude}&long=${longitude}`}
//           >
//             more
//           </Link>
//         </Text> */}
//         {/* <Offerdesign2 />
//       </div> */}
//       {/* <div className="Offerdesign">
//         <Text fontSize="30px" textAlign={"center"} p="6px" fontWeight="600">
//           Category
//         </Text>
//         <div className="mflex">
//           {totaloffer &&
//             totaloffer.map((offer) => (
//               // <div className='card-design' key={offer._id}> <Link href={`/offer/${offer._id}`}>{offer.offername}</Link></div>
//               <div className="carddesign" key={offer._id}>
//                 {offer.Category == "cloth" && (
//                   <Box
//                     // maxW={['0px',"445px"]}
//                     bg={"whiteAlpha.200"}
//                     boxShadow={"xl"}
//                     rounded={"md"}
//                     p={6}
//                     _hover={{
//                       boxShadow: "outline",
//                       p: "6",
//                       rounded: "md",
//                     }}
//                     overflow={"hidden"}
//                   >
//                     <Box h={"210px"} mt={-6} mx={-6} mb={6} pos={"relative"}>
//                       <Image
//                         layout={"fill"}
//                       />
//                     </Box>
//                     <Stack>
//                       <Text
//                         color={"green.500"}
//                         textTransform={"uppercase"}
//                         fontWeight={800}
//                         fontSize={"sm"}
//                         letterSpacing={1.1}
//                       >
//                         Offer
//                       </Text>
//                       <Heading
//                         color={[("gray.700", "white")]}
//                         fontSize={"2xl"}
//                         fontFamily={"body"}
//                       >
//                         <Link href={`/offer/${offer._id}`}>
//                           {offer.offername}
//                         </Link>
//                       </Heading>
//                     </Stack>
//                   </Box>
//                 )}
//               </div>
//             ))}
//         </div>
//       </div> */}
//       {/* <Offerdesign1 />

//       <Carausal /> */}
//     </>
//   );
// }
