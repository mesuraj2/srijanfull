import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../components/FooterT2';
import ImageUploader from '../../components/ImageUploader';
import NavbarT2 from '../../components/NavbarT2';

const cabshare = () => {
  const router = useRouter();
  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="w-[90%] mx-auto">
        <NavbarT2 />

        <div className="flex flex-col items-center justify-center gap-5">
          <div className="">
            <label className="label">
              <span className="label-text">Current Location</span>
            </label>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-[30rem]"
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Destination</span>
            </label>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-[30rem]"
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Cab Discription</span>
            </label>
            <textarea className="textarea w-[30rem]" placeholder="" />
          </div>
        </div>

        <div className="flex items-center justify-center pb-[5rem] gap-5 pt-[2rem]">
          <button className="btn  btn-outline secondary_font  mt-5  text-[1.2rem] w-[20rem]">
            Create New Offer
          </button>
          <button
            onClick={() => router.push('/createOfferChat')}
            disabled={true}
            className="btn btn-error text-white secondary_font bg-red-500 mt-5  text-[1.2rem] w-[20rem]"
          >
            Pool Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default cabshare;
