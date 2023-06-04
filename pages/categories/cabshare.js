import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../components/FooterT2';
import ImageUploader from '../../components/ImageUploader';
import NavbarT2 from '../../components/NavbarT2';

const Cabshare = () => {
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
            className="input input-bordered w-full mx-auto"
          />
        </div>
        <div className="w-[90%] 6xl:w-[30rem]">
          <label className="label">
            <span className="label-text">Destination</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full mx-auto"
          />
        </div>
        <div className="w-[90%] 6xl:w-[30rem]">
          <label className="label">
            <span className="label-text">Cab Discription</span>
          </label>
          <textarea className="textarea w-full mx-auto" placeholder="" />
        </div>
      </div>

      <div className="flex  flex-col items-center justify-center pb-[5rem] gap-5 pt-[2rem]">
        {/* <button className="btn  btn-outline secondary_font  mt-5  text-[1.2rem] w-[15rem] 6xl:w-[20rem]">
          Create New Offer
        </button> */}
        <button
          onClick={() => router.push('/createOfferChat')}
          disabled={true}
          className="btn btn-error text-white secondary_font bg-red-500 mt-5  text-[1.2rem] w-[15rem] 6xl:w-[20rem]"
        >
          Pool Now
        </button>
      </div>
    </div>
  );
};

export default Cabshare;
