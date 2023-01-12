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




export default function Index() {
  const [Alloffer, setAlloffer] = useState([])
  const [Allchat, setAllchat] = useState([])
//   const [latitude, setlatitude] = useState()
// const [longitude, setlongitude] = useState()
// const [city, setcity] = useState()
const { city,latitude,longitude,setlatitude,setlongitude,setcity } =
ChatState();

  const getoffernearyou=async ()=>{
      const res =await fetch(`/api/offer/offernearyou`, {
    method: 'GET',
  })
  let Alloffer= await res.json()
  // console.log(Alloffer)
  setAlloffer(Alloffer)
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
    getoffernearyou()
    getallchatnearyou()
  }, [])

  const getpostion=async()=>{
    navigator.geolocation.getCurrentPosition(
      position => { 
        setlatitude(position.coords.latitude)
        setlongitude(position.coords.longitude)
      }, 
      err => console.log(err)
    );

    const {data}=await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    setcity(data.city)
  }
useEffect(() => {
getpostion()
}, [])



  return (
    <div className='bgcolor'>
      <div className='location_postion'>
      <div>
      <div>{city && city}</div>
      <button onClick={getpostion}>update location</button>
      </div>
      </div>
      {/* <Link href="/offer_page">OfferPage </Link> */}

      <Offer  alloffer={Alloffer} allchat={Allchat}/>
    </div>
  )
}

