import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Footer from '../../components/FooterT2';
import ImageUploader from '../../components/ImageUploader';
import NavbarT2 from '../../components/NavbarT2';

const Cabshare = () => {
  const initValues = {
    currentLoc: '',
    destination: '',
    cabDisc: '',
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
            <span className="label-text">Cab Discription</span>
          </label>
          <textarea
            name="cabDisc"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.cabDisc}
            className="textarea w-full mx-auto"
            placeholder=""
          />
          {touched['cabDisc'] && !values['cabDisc'] && (
            <span className="label-text-alt mt-1 text-red-600">Required</span>
          )}
        </div>
      </div>

      <div className="flex  flex-col items-center justify-center pb-[5rem] gap-5 pt-[2rem]">
        {/* <button className="btn  btn-outline secondary_font  mt-5  text-[1.2rem] w-[15rem] 6xl:w-[20rem]">
          Create New Offer
        </button> */}
        <button
          onClick={() => router.push('/createOfferChat')}
          disabled={
            !values.cabDisc || !values.destination || !values.currentLoc
          }
          className="btn btn-error text-white secondary_font bg-red-500 mt-5  text-[1.2rem] w-[15rem] 6xl:w-[20rem]"
        >
          Pool Now
        </button>
      </div>
    </div>
  );
};

export default Cabshare;
