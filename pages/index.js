// import Head from 'next/head'
// import Image from 'next/image'
import { useState ,useEffect} from 'react'
import Link from 'next/link'
// import styles from '../styles/Home.module.css'
import Router from 'next/router'
import Offer from '../components/Offer'
import  secureLocalStorage  from  "react-secure-storage";
import axios from 'axios';
import { ChatState } from "../Context/ChatProvider";
import React from 'react'

import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { NextSeo } from 'next-seo';
import { useToast } from '@chakra-ui/react';



export default function Index() {
  const [imageupload, setimageupload] = useState()
  const [Alloffer, setAlloffer] = useState([])
  const [Allchat, setAllchat] = useState([])
//   const [latitude, setlatitude] = useState()
// const [longitude, setlongitude] = useState()
// const [city, setcity] = useState()
const toast =useToast()
const { city,latitude,longitude,setlatitude,setlongitude,setcity } =
ChatState();

  const getoffernearyou=async ()=>{
    const { data } = await axios.post(
      `/api/offer/frontpageOffer`,
      {
        suraj:"kumar",
        coordinate: localStorage.getItem("coordinates"),
      },
    );
    setAlloffer(data)
    }

  const getallchatnearyou=async ()=>{
      const res =await fetch(`/api/offer/topChatnearYou`, {
    method: 'GET',
  })
  let allchat= await res.json()
  // console.log(allchat[0].users.length)
  setAllchat(allchat)
  }
  useEffect(() => {
   if(localStorage.getItem("coordinates")){
    getoffernearyou()
    getallchatnearyou()
   }
  }, [])

  const getpostion=async()=>{
    getoffernearyou()
    getallchatnearyou()
    navigator.geolocation.getCurrentPosition(
      position => { 
        setlatitude(position.coords.latitude)
        setlongitude(position.coords.longitude)
        let coordinate=[position.coords.latitude,position.coords.longitude]
        localStorage.setItem("coordinates",JSON.stringify(coordinate))
      }, 
      err => console.log(err)
    );

    const {data}=await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    setcity(data.city)

  }
// useEffect(() => {
// getpostion()
// }, [])

const uploadImg=async ()=>{

  const form=new FormData()
  form.append("pic",imageupload)
  const {data}=await axios.post("/upload",form)
  // console.log(data)
}


  return (
    <>
    <NextSeo
      title="Poolandsave"
      description="We are trying to make bridge for connectiong more people together. if they want more people to avail a particular offer then they can pool offer here. we will make a chat thread and they can chat there and can buy it"
    />
    <main className='bgcolor'>
      <div className='location_postion'>
      <div>
      <div>{city && city}</div>
      <button onClick={getpostion}>update location</button>
      </div>
      </div>
      <a href="suraj.html">file</a>
      <Link href='/offer_page'>addOffer</Link>
      {/* <Link href="/categoryOfferDetail">OfferPage </Link> */}

      {Alloffer && <Offer  alloffer={Alloffer} allchat={Allchat}/>}
    </main>
    </>
  )
}

