import Image from 'next/image';
import React, { useState } from 'react';
import FooterT2 from '../components/FooterT2';
import ImageUploader from '../components/ImageUploader';
import NavbarT2 from '../components/NavbarT2';

const createOffer = () => {
  const [images, setImages] = useState([]);
  const [offerName, setofferName] = useState('');
  const [offerdescription, setofferDescription] = useState('')

  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="w-[90%] mx-auto">
        <NavbarT2 />

        <div className="flex flex-col items-center justify-center gap-5">
          <div className="">
            <label className="label">
              <span className="label-text">Upload Images (max: 5)</span>
            </label>
            <ImageUploader setImages={setImages} />
            {/* <input
                type="file"
                name="new-offer-images"
                multiple
                className="file-input w-[30rem]"
              /> */}
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Offer Name</span>
            </label>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-[30rem]"
              value={offerName}
              onChange={(e)=> setofferName(e.target.value)}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Offer Discription</span>
            </label>
            <textarea className="textarea w-[30rem]" placeholder="" value={offerdescription} onChange={(e) => {setofferDescription(e.targer.value)}}/>
          </div>
        </div>

        <div className="flex items-center justify-center pb-[5rem] gap-5 pt-[2rem]">
          <button className="btn  btn-outline secondary_font  mt-5  text-[1.2rem] w-[20rem]">
            Create New Offer
          </button>
          <button
            disabled={true}
            className="btn btn-error text-white secondary_font bg-red-500 mt-5  text-[1.2rem] w-[20rem]"
          >
            Pool Now
          </button>
        </div>
      </div>
      <FooterT2 />
    </div>
  );
};

export default createOffer;
