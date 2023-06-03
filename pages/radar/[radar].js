import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import FooterT2 from '../../components/FooterT2';
import NavbarT2 from '../../components/NavbarT2';
import axios from 'axios';
import { GoogleMap, LoadScript, Circle, CircleF, Marker, MarkerF } from '@react-google-maps/api';

const handleJoinChat = async ({ chat_id, router }) => {
  const { data } = await axios.put('/api/chat/groupaddOffer', { chatId: chat_id });
  if (data) {
    router.push('/chat')
  }
}



function MapComponent({ router, chats }) {
  // console.log(chats)
  const center = {
    lat: JSON.parse(router.query.location)[0],
    lng: JSON.parse(router.query.location)[1]
  }

  const containerStyle = {
    width: '100%',
    height: '400px'
  };


  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: Number(router.query.radius),
    zIndex: 1
  }

  function MapChats(chat, index) {
    if (chat.Location.coordinates.length > 0) {
      return (<MarkerF key={index} position={{ lat: Number(chat.Location.coordinates[0]), lng: Number(chat.Location.coordinates[1]) }} />)
    }
    else {
      return (<></>)
    }
  }

  return (
    <LoadScript
    googleMapsApiKey ="AIzaSyA5-1f-M5kxCKGgISp6Q0GT00SECxJRoXs"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
      >

        <MarkerF
          position={center}
        />

        {chats && chats.map(MapChats)}

        <CircleF
          options={options}
          center={center}
        />
        <></>
      </GoogleMap>
    </LoadScript>
  )
}


const ChatCard = ({ name, users, chat_id, router }) => {
  return (
    <div className="flex flex-row bg-white py-3 px-5 justify-center items-center gap-8 m-3">
      <p>{name}</p>
      <div className="radial-progress" style={{ '--value': eval(users) * 100 }}>
        {users}
      </div>
      <div className="flex flex-col items-center justify-center">
        <div>
          <p>Chat expires in</p>
          <span className="countdown font-mono text-2xl">
            <span style={{ '--value': 10 }}></span>:
            <span style={{ '--value': 24 }}></span>:
            <span style={{ '--value': 3 }}></span>
          </span>
        </div>
      </div>
      <button className="btn" onClick={() => { handleJoinChat({ chat_id, router }) }}>Join Chat</button>
    </div>
  );
};

const JoinChatPanel = ({ setchatoption, chatdata, router }) => {
  return (
    <div className="rounded-md p-5 bg-white/70">
      {chatdata && chatdata.chat_id.map((chats,index) => {
        return (
          <ChatCard key={index} name={chats.chatName} users={`${chats.users.length}/${chatdata.quantity}`} chat_id={chats._id} router={router} />)
      })}

      <div className="divider">OR</div>
      <button onClick={() => { setchatoption(false) }} className="btn btn-error text-white secondary_font bg-red-500 mt-5 mx-auto text-[1.2rem] w-full capitalize">
        Create your own chat room
      </button>
    </div>
  );
};

const CreateChatForm = ({ setchatoption, router }) => {
  const [chatname, setchatname] = useState('')
  const [chatdescription, setchatdescription] = useState('')
  const [chatexpiry, setchatexpiry] = useState('')
  const [latitude, setlatitude] = useState()
  const [longitude, setlongitude] = useState()

  useEffect(() => {
    if (localStorage.getItem("coordinates")) {
      let coordinate = JSON.parse(localStorage.getItem("coordinates"))
      setlatitude(coordinate[0])
      setlongitude(coordinate[1])
    }
    else {
      navigator.geolocation.getCurrentPosition(
        position => {
          setlatitude(position.coords.latitude)
          setlongitude(position.coords.longitude)
          let coordinate = [position.coords.latitude, position.coords.longitude]
          localStorage.setItem("coordinates", JSON.stringify(coordinate))
        },
        err => console.log(err)
      );
    }
  })

  const handleCreate = async () => {
    const response = await axios.post('/api/chat/offerchat', { chatName: chatname, offerid: router.query.radar, coordinate: `[${latitude},${longitude}]` })
    if (response.data) {
      router.push('/chat')
    }
  }
  return (
    <div className="rounded-md p-5 bg-white/70 ">
      <div className='flex cursor-pointer' onClick={() => { setchatoption(true) }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 6L9 12L15 18" stroke="#222222" onClick={() => { setchatoption(true) }} />
        </svg>
        <h1 className='text-xl'>Create New Chat</h1>
      </div>
      <div className="form-control max-w-xs flex flex-col gap-2 w-[30rem]">
        <label className="label">
          <span className="label-text">Chat Name</span>
        </label>
        <input
          type="text"
          placeholder=""
          className="input input-bordered w-full max-w-xs"
          value={chatname}
          onChange={(e) => { setchatname(e.target.value) }}
        />

        <label className="label">
          <span className="label-text">Chat Discription</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder=""
          value={chatdescription}
          onChange={(e) => { setchatdescription(e.target.value) }}
        ></textarea>
        <label>
          <span className="label-text">Expires in</span>
        </label>
        <select className="select w-full max-w-xs" onChange={(e) => { setchatexpiry(e.target.value) }}>
          <option disabled selected>
            10 minutes
          </option>
          <option value='5'>5 minutes</option>
          <option value='10'>10 minutes</option>
          <option value='30'>30 minutes</option>
          <option value='45'>45 minutes</option>
          <option value='60'>1 hour</option>
        </select>
        <button className="btn btn-error text-white secondary_font bg-red-500 mt-5 mx-auto text-[1rem]  w-full" onClick={handleCreate} >
          Create Chat
        </button>
      </div>
    </div>
  );
};





const Radar = ({ data }) => {
  const [chatoption, setchatoption] = useState(true)
  const router = useRouter();
  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="w-[90%] mx-auto">
        <NavbarT2 />
        <div className="my-[5rem] flex flex-row justify-center gap-[5rem] items-center">
          <div className="flex flex-col gap-5 ">

            <MapComponent router={router} chats={data.chat_id} />
            <select className="select  w-[40rem]" onChange={(e) => {
              router.push({ path: router.pathname, query: { ...router.query, radius: e.target.value } })
            }}>
              <option disabled selected>
                Pick Radius
              </option>
              <option value={100}>100 m</option>
              <option value={200}>200 m</option>
              <option value={500}>500 m</option>
              <option value={1000}>1 km</option>
              <option value={2000}>2 km</option>
            </select>
          </div>
          <div className="">
            {/* <button className="btn btn-error text-white secondary_font bg-red-500 mt-5 mx-auto text-[1.2rem]  w-[10rem]">
              Search
            </button> */}
            {chatoption ? <JoinChatPanel setchatoption={setchatoption} chatdata={data} router={router} /> : <CreateChatForm setchatoption={setchatoption} router={router} />}
          </div>
        </div>
      </div>
      <FooterT2 />
    </div>
  );
};

export default Radar;

export async function getServerSideProps(context) {
  const offerid = context.query.radar
  const queries = context.query.radius ? {
    id: offerid,
    radius: context.query.radius,
    lat: JSON.parse(context.query.location)[0],
    long: JSON.parse(context.query.location)[1]
  } : {
    id: offerid
  }
  console.log(queries);
  const { data } = await axios.post(
    `${process.env.DOMAIN_URI}/api/offer/offerchats`,
    {id: offerid}
  );
  return {
    props: { data },
  };
}
