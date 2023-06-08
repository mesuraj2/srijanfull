import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import '@reach/combobox/styles.css';

import Footer from '../../components/FooterT2';
import ImageUploader from '../../components/ImageUploader';
import NavbarT2 from '../../components/NavbarT2';
import {
  GoogleMap,
  LoadScript,
  CircleF,
  MarkerF,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";


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

  const {
    ready,
    value,
    suggestions: { status, data: placesData },
    setValue,
  } = usePlacesAutocomplete();

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (val) => {
    setValue(val, false);
  };

  // handlers

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
      else{
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (values.distance === 'custom') {
      setData((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          ['distance']: customDistance,
        },
      }));
    }
  };

  useEffect(() => {
    if (values.distance === 'custom') {
      setSelectCustom(true);
    } else {
      setSelectCustom(false);
    }
    console.log(data);
  }, [data, values.distance]);

  const router = useRouter();
  return (
    <div className="w-screen bg-[#B9E9FC]">
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
          <Combobox onSelect={handleSelect} aria-labelledby="demo">
            <ComboboxInput
              value={value}
              onChange={handleInput}
              disabled={!ready}
            />
            <ComboboxPopover>
              <ComboboxList>
                {status === 'OK' &&
                  data.map(({ place_id, description }) => (
                    <ComboboxOption key={place_id} value={description} />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
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
        <div className="w-[90%] 6xl:w-[30rem]">
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
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 pb-[3rem] pt-[1rem]">
        <img
          src="/img/map.jpg"
          className="w-[90vw] 6xl:w-[30rem]"
          alt="image"
        />
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
            !values.description ||
            !values.destination ||
            !values.currentLoc
          }
          className="btn btn-error text-white secondary_font bg-red-500 6xl:mt-5 mx-auto text-[1.2rem] w-[15rem] 6xl:w-[20rem]"
          onClick={(e) => submitHandler(e)}
        >
          Start Pooling
        </button>
      </div>
    </div>
  );
};

export default Cabshare;
