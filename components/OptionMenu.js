import React from 'react'
import { Box, Flex, Heading, Select, Text, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { BsFillCartCheckFill, BsFillChatDotsFill } from 'react-icons/bs';
import { ChatState } from "../Context/ChatProvider";
import { ImLocation2 } from 'react-icons/im';
import { MdLocalOffer } from 'react-icons/md';


export default function OptionMenu() {
    const { city,latitude,longitude,setlatitude,setlongitude,setcity } =
ChatState();
  return (
    <Flex justifyContent={'flex-end'} alignItems='center' height={'64px'}>
      <Box display={'flex'} alignItems='center' mr={'1rem'}>
         <Link href={'/chat'}><BsFillChatDotsFill size={20}/></Link> 
          <Link href={'/chat'}><Text ml={'0.5rem'}>Chat</Text></Link>
        </Box>
        <Box display={'flex'} alignItems='center' mr={'1rem'}>
          <ImLocation2 size={20}/>
          <Select placeholder='Location' border={'none'}>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
        </Box>
        <Box display={'flex'} alignItems='center' mr={'1rem'}>
          <BsFillCartCheckFill size={20}/>
          <Text ml={'0.5rem'}>Cart Items</Text>
        </Box>
        <Box display={'flex'} alignItems='center' mr={'1rem'}>
          <MdLocalOffer size={20}/>
          <Link style={{marginleft:'0.5rem'}} className='ml-2'
            href={`/categoryOfferDetail?category=cloth&lat=${latitude}&long=${longitude}`}
          >offer</Link>
        </Box>
      </Flex>
  )
}
