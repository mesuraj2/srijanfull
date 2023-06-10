import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from '@reach/combobox';
import axios from 'axios';
// import '@reach/combobox/styles.css';
import { useToast } from "@chakra-ui/react";
import Footer from '../../components/FooterT2';
import ImageUploader from '../../components/ImageUploader';
import NavbarT2 from '../../components/NavbarT2';
import { ChatState } from "../../Context/ChatProvider";
import {
  GoogleMap,
  LoadScript,
  CircleF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
//   clearSuggestions
// } from "use-places-autocomplete";
import secureLocalStorage from 'react-secure-storage';
import io from 'socket.io-client'
import { getCookie } from 'cookies-next';
import Notification from '../../components/notification';
const ENDPOINT = `https://picapool.com`; //["http://poolandsave.com","http://www.poolandsave.com/"]; //   "https://talk-a-tive.herokuapp.com"; -> After deployment
// const ENDPOINT = `http://localhost:3000`; //["http://poolandsave.com","http://www.poolandsave.com/"]; //   "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

function MapComponent({ router }) {
  const center = {
    lat: JSON.parse(router.query.location)[0],
    lng: JSON.parse(router.query.location)[1],
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: Number(router.query.radius),
    zIndex: 1,
  };


  return (
    <LoadScript googleMapsApiKey="AIzaSyA5-1f-M5kxCKGgISp6Q0GT00SECxJRoXs">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
        <MarkerF position={center} />

        <CircleF options={options} center={center} />
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

const Cabshare = () => {
  const { setSelectedChat } = ChatState();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GoogleMapApiKey,
    libraries: ["places"],
  });

  const initValues = {
    currentLoc: '',
    destination: '',
    description: '',
    distance: 4000,
    radius: 4000,
    expTime: 0,
  };

  const initState = { isLoading: false, error: '', values: initValues };
  const [data, setData] = useState(initState);
  const [touched, setTouched] = useState({});
  const { values, isLoading, error } = data;
  const [selectCustom, setSelectCustom] = useState(false);
  const [customDistance, setCustomDistance] = useState(4000);
  const toast = useToast();


  //us e Places Autocomplete Code Here

  // const {
  //   ready,
  //   value,
  //   suggestions: { status, placesdata },
  //   setValuePlaces,
  // } = usePlacesAutocomplete()

  // const handleSelect = (val) => {
  //   setValuePlaces(val, false);
  // };

  // handlers

  useEffect(() => {
    if (getCookie("authtoken")) {
      socket = io(ENDPOINT);
      socket.emit("setup", secureLocalStorage.getItem("id"));
    }
    // eslint-disable-next-line
  }, []);

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) => {
    if (target.name == "distance") {
      if (target.value == "custom") {
        setData((prev) => ({
          ...prev,
          values: {
            ...prev.values,
            [target.name]: target.value,
            ["radius"]: customDistance
          },
        }))
      }
      else {
        setData((prev) => ({
          ...prev,
          values: {
            ...prev.values,
            [target.name]: target.value,
            ["radius"]: target.value
          },
        }))
      }
    }
    else {
      setData((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          [target.name]: target.value,
        },
      }))
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`/api/chat/cabsharechat`, {
      from: values.currentLoc,
      to: values.destination,
      coordinate: localStorage.getItem("coordinates"),
    });

    if (data.error) {
      toast({
        title: data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "successfull created",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      axios
        .get("/api/auth/getNearUser")
        .then((response) => {
          socket.emit(
            "new offerchat",
            response.data,
            secureLocalStorage.getItem("id")
          );
        })
        .catch((error) => console.log(error));

      const res2 = await fetch(`/api/chat/fetchgroupChat`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ChatId: data._id }),
      });
      let data2 = await res2.json();
      // //console.log(data2)
      setSelectedChat(data2);
      router.push({ pathname: "/chat" });
    }
  };

  useEffect(() => {
    if (values.distance === 'custom') {
      setSelectCustom(true);
    } else {
      setSelectCustom(false);
    }
    //console.log(data);
  }, [data, values.distance]);

  const router = useRouter();
  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div hidden><Notification /></div>
      <div className="w-[90vw] mt-10  6xl:w-[32rem] mx-auto flex flex-col items-center justify-center gap-5">
        <div className="w-[90%] 6xl:w-[30rem]">
          <label className="label">
            <span className="label-text">Current Location</span>
          </label>
          <input
            type="text"
            placeholder=""
            name="currentLoc"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.currentLoc}
            className="input input-bordered w-full mx-auto"
          />
          {/* <Combobox onSelect={handleSelect} aria-labelledby="demo" >
            <ComboboxInput
              className="input input-bordered w-full mx-auto"
              value={value}
              onChange={(e) => setValuePlaces(e.target.value)}
              disabled={!ready}
            />
            <ComboboxPopover>
              <ComboboxList>
                {status === 'OK' &&
                  placesdata.map(({ place_id, description }) => (
                    <ComboboxOption key={place_id} value={description} />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox> */}
          {touched['currentLoc'] && !values['currentLoc'] && (
            <span className="label-text-alt mt-1 text-red-600">Required</span>
          )}
        </div>
        <div className="w-[90%] 6xl:w-[30rem]">
          <label className="label">
            <span className="label-text">Destination</span>
          </label>
          <input
            type="text"
            placeholder=""
            name="destination"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.destination}
            className="input input-bordered w-full mx-auto"
          />
          {touched['destination'] && !values['destination'] && (
            <span className="label-text-alt mt-1 text-red-600">Required</span>
          )}
        </div>
        {/* <div className="w-[90%] 6xl:w-[30rem]">
          <label className="label">
            <span className="label-text">Discription</span>
          </label>
          <textarea
            name="description"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.description}
            className="textarea w-full mx-auto"
            placeholder=""
          />
          {touched['description'] && !values['description'] && (
            <span className="label-text-alt mt-1 text-red-600">Required</span>
          )}
        </div> */}
      </div>

      <div className="flex flex-col items-center justify-center gap-5 pb-[3rem] pt-[1rem]">
        {/* <img
          src="/img/map.jpg"
          className="w-[90vw] 6xl:w-[30rem]"
          alt="image"
        /> */}
        <select
          className={`select  w-fit mx-auto`}
          value={values.distance}
          onChange={handleChange}
          name={'distance'}
        >
          <option disabled value="" selected>
            Pick Radius
          </option>
          <option value={100}>100 m</option>
          <option value={200}>200 m</option>
          <option value={500}>500 m</option>
          <option value={1000}>1 km</option>
          <option value={2000}>2 km</option>

          <option value={'custom'}>Custom</option>
        </select>
        <div className={`flex-col ${!selectCustom ? 'hidden' : 'flex'} gap-3`}>
          <p>Search under {customDistance / 1000} km</p>
          <div>
            <input
              type="range"
              min="0"
              max="10000"
              name="distance"
              value={customDistance}
              className="range range-xs"
              step="100"
              onChange={(e) => setCustomDistance(e.target.value)}
            />
            <div className="w-[30rem] flex justify-between text-xs px-2">
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label>
            <span className="label-text">Expires in</span>
          </label>
          <select
            className={`${touched.expTime && !values.expTime ? 'bg-red-100' : 'bg-white'
              } select w-[90vw] 6xl:w-[30rem]`}
            value={values.expTime}
            onChange={handleChange}
            onBlur={onBlur}
            name="expTime"
          >
            <option disabled value="" selected>
              Select duration
            </option>
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>1 hour</option>
          </select>
          {touched.expTime && !values.expTime && (
            <span className="label-text-alt mt-1 text-red-600">Required</span>
          )}
        </div>
      </div>
      <div className="flex items-center pb-[5rem]">
        <button
          disabled={
            !values.distance ||
            !values.destination ||
            !values.currentLoc
          }
          className="btn btn-error text-white secondary_font bg-red-500 6xl:mt-5 mx-auto text-[1.2rem] w-[15rem] 6xl:w-[20rem]"
          onClick={submitHandler}
        >
          Start Pooling
        </button>
      </div>
    </div>
  );
};

export default Cabshare;
