import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChatState } from "../../Context/ChatProvider";

import Offerdesign1 from "./offerdesign1";
import Offerdesign2 from "./offerdesign2";
import Carausal from "./carausal";
import Image from "next/image";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";

// export default function blogPostWithImage() {
//   return (

//   );
// }

export default function Alloffer({ totaloffer }) {
  const { city,latitude,longitude,setlatitude,setlongitude,setcity } =
  ChatState();
  useEffect(() => {
    setlatitude(JSON.parse(localStorage.getItem('coordinates'))[0])
    setlongitude(JSON.parse(localStorage.getItem('coordinates'))[1])
  }, [])
  

  
  return (
    <>
    <div className="Offerdesign">
      <Text fontSize="30px" textAlign={"center"} p="6px" fontWeight="600">
        OfferDesign2
        <Link href={`/categoryOfferDetail?category=cloth&lat=${latitude}&long=${longitude}`}>more</Link>
      </Text>
      <Offerdesign2/>
      </div>
    <div className="Offerdesign">
      <Text fontSize="30px" textAlign={"center"} p="6px" fontWeight="600">
        Category
        
      </Text>
      <div className="mflex">
        {totaloffer.map((offer) => (
          // <div className='card-design' key={offer._id}> <Link href={`/offer/${offer._id}`}>{offer.offername}</Link></div>
          <div className="carddesign" key={offer._id}>
            {
              offer.Category=='cloth' && 
              <Box
              // maxW={['0px',"445px"]}
              bg={"whiteAlpha.200"}
              boxShadow={"xl"}
              rounded={"md"}
              p={6}
              _hover={{
                boxShadow: "outline",
                p: "6",
                rounded: "md",
              }}
              overflow={"hidden"}
            >
              <Box
                h={"210px"}
                mt={-6}
                mx={-6}
                mb={6}
                pos={"relative"}
              >
                <Image
                  src="data:image/jpeg;base64,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"
                  layout={"fill"}
                />
              </Box>
              <Stack>
                <Text
                  color={"green.500"}
                  textTransform={"uppercase"}
                  fontWeight={800}
                  fontSize={"sm"}
                  letterSpacing={1.1}
                >
                  Offer
                </Text>
                <Heading
                  color={[("gray.700", "white")]}
                  fontSize={"2xl"}
                  fontFamily={"body"}
                >
                  <Link href={`/offer/${offer._id}`}>{offer.offername}</Link>
                </Heading>
              </Stack>
            </Box>
            }
          </div>
        ))}
      </div>
      </div>
      <Offerdesign1/>

      <Carausal />



      
    </>
  );
}
