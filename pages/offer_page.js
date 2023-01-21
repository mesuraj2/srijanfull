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
const { city,latitude,longitude,setlatitude,setlongitude,setcity } =
  ChatState();
  const [imageupload, setimageupload] = useState()
  const [imageurl, setimageurl] = useState()
  
  useEffect(() => {
    setlatitude(JSON.parse(localStorage.getItem('coordinates'))[0])
    setlongitude(JSON.parse(localStorage.getItem('coordinates'))[1])
  }, [])

const uploadImg=async ()=>{

  const form=new FormData()
  form.append("pic",imageupload)
  const {data}=await axios.post("/upload",form)
  setimageurl(data)

}


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
          url:imageurl,
          coordinate: localStorage.getItem("coordinates"),
        },
        config
      );
      console.log(data)
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
      <div>
      <input type="file"  accept="image/jpeg" onChange={(event)=>{setimageupload(event.target.files[0])}}/>
      <button onClick={uploadImg}>upload</button>
      </div>
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
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}
