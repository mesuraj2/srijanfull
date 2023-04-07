// import React from 'react'
// import { useState,useEffect } from 'react'
// import Link from 'next/link'
// import { Avatar, AvatarBadge, AvatarGroup, Box, Text, Tooltip, Wrap, WrapItem } from '@chakra-ui/react'


// export default function allchat({totalchat}) {


//   return (
//     <>
//     <Box w={'91vw'} m='auto' >
//     <Text borderBottom='1px' mb={'16px'} borderColor='black.200' fontSize="30px" textAlign={"center"} p="6px" fontWeight="600">
//     Top Offer Chat You
//    </Text>
//     <Wrap >
//       { totalchat &&
//         totalchat.sort((a, b) => a.users.length > b.users.length ? -1 : 1)
//         .map((offer)=>(
//             // <div className='card-design' key={offer._id}>{offer.chatName}</div>
//             <WrapItem key={offer._id}>
//               <Tooltip label={offer.chatName+" "+"Users Active "+offer.users.length}>
//               <div className="offerchatmarginx"><Link href={`/offer/${offer.offerid}`}>
//             <Avatar  name={offer.chatName} /></Link></div>
//             </Tooltip>
//            </WrapItem>
//         ))
//         }
//     </Wrap>
//     </Box>
//     </>
//   )
// }




