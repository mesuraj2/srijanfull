import Image from 'next/image';
import React, { useState } from 'react';
import FooterT2 from '../components/FooterT2';
import ImageUploader from '../components/ImageUploader';
import NavbarT2 from '../components/NavbarT2';

const createOfferChat = () => {
  const [selectCustom, setSelectCustom] = useState(false);
  const initValues = {
    distance: 4000,
    cname: '',
    cdisc: '',
    expTime: 0,
  };

  const initState = { isLoading: false, error: '', values: initValues };
  const [data, setData] = useState(initState);
  const [touched, setTouched] = useState({});
  const { values, isLoading, error } = data;

  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="w-[90%] mx-auto">
        <NavbarT2 />
        <div className="flex flex-col items-center justify-center gap-5 pt-[5rem] pb-[3rem]">
          <img
            src="/img/map.jpg"
            className="w-[90vw] 6xl:w-[30rem]"
            alt="image"
          />
          <select
            className={`select ${selectCustom ? 'hidden' : ''} w-fit mx-auto`}
          >
            <option disabled selected>
              Pick Radius
            </option>
            <option>100 m</option>
            <option>200 m</option>
            <option>500 m</option>
            <option>1 km</option>
            <option>2 km</option>
            <option>custom</option>
          </select>
          <div
            className={` flex-col ${!selectCustom ? 'hidden' : 'flex'} gap-3`}
          >
            <p>Search under 4 km</p>
            <div>
              <input
                type="range"
                min="0"
                max="20"
                value="4"
                className="range  range-xs"
                step="4"
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
              </div>
            </div>
          </div>

          <div className="">
            <label className="label">
              <span className="label-text">Chat Name</span>
            </label>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-[90vw] 6xl:w-[30rem]"
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Chat Discription</span>
            </label>
            <textarea
              className="textarea w-[90vw] 6xl:w-[30rem]"
              placeholder=""
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>
              <span className="label-text">Expires in</span>
            </label>
            <select className="select w-[90vw] 6xl:w-[30rem]">
              <option disabled selected>
                10 minutes
              </option>
              <option>5 minutes</option>
              <option>10 minutes</option>
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>1 hour</option>
            </select>
          </div>
        </div>
        <div className="flex items-center pb-[5rem]">
          <button className="btn btn-error text-white secondary_font bg-red-500 6xl:mt-5 mx-auto text-[1.2rem] w-[15rem] 6xl:w-[20rem]">
            Start Pooling
          </button>
        </div>
      </div>
      <FooterT2 />
    </div>
  );
};

export default createOfferChat;
