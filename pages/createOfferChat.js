import { el } from 'date-fns/locale';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import FooterT2 from '../components/FooterT2';
import ImageUploader from '../components/ImageUploader';
import NavbarT2 from '../components/NavbarT2';

const CreateOfferChat = () => {
  const [selectCustom, setSelectCustom] = useState(false);
  const [customDistance, setCustomDistance] = useState(4);
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

  // handlers

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) =>
    setData((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

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

  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="w-[90%] mx-auto">
        {/* <NavbarT2 /> */}
        <div className="flex flex-col items-center justify-center gap-5 pt-[5rem] pb-[3rem]">
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
          <div
            className={`flex-col ${!selectCustom ? 'hidden' : 'flex'} gap-3`}
          >
            <p>Search under {customDistance} km</p>
            <div>
              <input
                type="range"
                min="0"
                max="10"
                name="distance"
                value={customDistance}
                className="range range-xs"
                step="0.1"
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

          <div className="">
            <label className="label">
              <span className="label-text">Chat Name</span>
            </label>
            <input
              value={values.cname}
              onChange={handleChange}
              onBlur={onBlur}
              type="text"
              name="cname"
              className="input input-bordered w-[90vw] 6xl:w-[30rem]"
            />
            {touched.cname && !values.cname && (
              <span className="label-text-alt mt-1 text-red-600">Required</span>
            )}
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Chat Discription</span>
            </label>
            <textarea
              className={`${
                touched.cdisc && !values.cdisc ? 'bg-red-100' : 'bg-white'
              } textarea w-[90vw] 6xl:w-[30rem]`}
              value={values.cdisc}
              onChange={handleChange}
              onBlur={onBlur}
              type="text"
              name="cdisc"
            />
            {touched.cdisc && !values.cdisc && (
              <span className="label-text-alt mt-1 text-red-600">Required</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label>
              <span className="label-text">Expires in</span>
            </label>
            <select
              className={`${
                touched.expTime && !values.expTime ? 'bg-red-100' : 'bg-white'
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
              (!values.cdisc && !values.cname && !values.expTime)
            }
            className="btn btn-error text-white secondary_font bg-red-500 6xl:mt-5 mx-auto text-[1.2rem] w-[15rem] 6xl:w-[20rem]"
            onClick={(e) => submitHandler(e)}
          >
            Start Pooling
          </button>
        </div>
      </div>
      {/* <FooterT2 /> */}
    </div>
  );
};

export default CreateOfferChat;
