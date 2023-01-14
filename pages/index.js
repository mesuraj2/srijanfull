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
import ReactCrop from '../components/React-crop'



export default function Index() {
  const [imageupload, setimageupload] = useState()
  const [Alloffer, setAlloffer] = useState([])
  const [Allchat, setAllchat] = useState([])
  const [latitude, setlatitude] = useState()
const [longitude, setlongitude] = useState()
// const [city, setcity] = useState()
// const { city,latitude,longitude,setlatitude,setlongitude,setcity } =
// ChatState();

  const getoffernearyou=async ()=>{
   await getpostion()
    console.log([latitude,longitude])
    const { data } = await axios.post(
      `/api/offer/frontpageOffer`,
      {
        suraj:"kumar",
        coordinate: JSON.stringify([17.59909,78.1261523]),
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
    // setcity(data.city)
  }
// useEffect(() => {
// getpostion()
// }, [])

const uploadImg=async ()=>{

  const form=new FormData()
  form.append("pic",imageupload)
  const {data}=await axios.post("/upload",form)
  console.log(data)
}
const [url, seturl] = useState()
const preview=()=>{
    var oFReader = new FileReader();
    oFReader.readAsDataURL(imageupload);

    oFReader.onload = function (oFREvent) {
       seturl(oFREvent.target.result);
    };
}



  return (
    <div className='bgcolor'>
      <div className='location_postion'>
      <div>
      {/* <div>{city && city}</div> */}
      <button onClick={preview}>previre</button>
      <img src={url} alt="" />
      <div>
        <input type="file" onChange={(event)=>{setimageupload(event.target.files[0])}}/>
        <button onClick={uploadImg}> upload file</button>
      </div>
      <button onClick={getpostion}>update location</button>
      </div>
      </div>
      {/* <Link href="/offer_page">OfferPage </Link> */}

      <Offer  alloffer={Alloffer} allchat={Allchat}/>
    </div>
  )
}

