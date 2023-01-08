import React from 'react'
import { useState,useEffect } from 'react'
import Link from 'next/link'
import { Avatar, AvatarBadge, AvatarGroup, Tooltip, Wrap, WrapItem } from '@chakra-ui/react'


export default function allchat({totalchat}) {



    // const allOffer= async()=>{
    //     const res =await fetch(`http://localhost:3001/api/offer/alloffer`, {
    //         method: 'GET', // or 'PUT'
    //         headers: {
    //         //   'Content-Type': 'application/json',
    //           'auth-token':localStorage.getItem('token')
    //         },
    //       })
    //       let data= await res.json()
    //       setAlloffer(data)
    //     //   console.log(data)
    //   }


  return (
    <>
    <Wrap>{ totalchat &&
        totalchat.sort((a, b) => a.users.length > b.users.length ? -1 : 1)
        .map((offer)=>(
            // <div className='card-design' key={offer._id}>{offer.chatName}</div>
            <WrapItem key={offer._id}>
              <Tooltip label={offer.chatName+" "+"Users Active "+offer.users.length}>
              <div className="offerchatmarginx"><Link href={`/offer/${offer.offerid}`}>
            <Avatar  name={offer.chatName} /></Link></div>
            </Tooltip>
           </WrapItem>
        ))
        }
    </Wrap>
    </>
  )
}




