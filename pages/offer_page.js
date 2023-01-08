import React, { useEffect } from 'react'
import { useState } from 'react';
import  secureLocalStorage  from  "react-secure-storage";
import axios from 'axios';
import { ChatState } from "../Context/ChatProvider";

import { useToast } from '@chakra-ui/react';
export default function Loc() {
// const [latitude, setlatitude] = useState()
// const [longitude, setlongitude] = useState()
const [offername, setoffername] = useState()
const [desc, setdesc] = useState()
const [category, setcategory] = useState()
// const [city, setcity] = useState()
const toast=useToast()
const { city,latitude,longitude } =
ChatState();


    // const getpostion=async()=>{
    //   navigator.geolocation.getCurrentPosition(
    //     position => { 
    //       console.log(position);
    //       setlatitude(position.coords.latitude)
    //       setlongitude(position.coords.longitude)
    //     }, 
    //     err => console.log(err)
    //   );

    //   const {data}=await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    //   setcity(data.city)
    // }
// useEffect(() => {
//   getpostion()
// }, [])
    const handleSubmit= async (e)=>{
      e.preventDefault();

      const config = {
        headers: {
          'auth-token':secureLocalStorage.getItem('token'),
        },
      };
      const { data } = await axios.post(
        `/api/offer`,
        {
          Offername: offername,
          desc:desc,
          category:category,
          coordinate: JSON.stringify([latitude,longitude]),
        },
        config
      );
      // console.log(data)
      if(data){
        toast({
          title: "added ",
          description: "added successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  return (
    <div>
      <form className='offerpagedesign' onSubmit={handleSubmit}>
      <label>Enter your offername:
        <input
          type="text" 
          value={offername}
          onChange={(e) => setoffername(e.target.value)} required
        />
      </label>
      <label>Enter your desc:
        <input
          type="text" 
          value={desc}
          onChange={(e) => setdesc(e.target.value)}  required
        />
      </label>
      <label>Enter your category:
        <input
          type="text" 
          value={category}
          onChange={(e) => setcategory(e.target.value)} required
        />
      </label>

      <label>check your location coordinate: {city && city}
        <p>lat: {latitude}</p> 
        <p> long:  {longitude}</p> 
      </label>
        <button>submit</button>
      </form>
    </div>
  )
}
