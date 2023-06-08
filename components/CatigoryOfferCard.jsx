import { useRouter } from 'next/router';
import React from 'react';

const CatigoryOfferCard = ({ name, description, image, _id, chatlink }) => {
  const router = useRouter();
  return (
    <div className="p-5 bg-base-100 shadow-xl rounded-md flex-col mx-auto h-[30rem] w-[16rem] lg:w-[14rem] 12xl:w-[16rem] 14xl:w-[20rem] flex justify-center items-center gap-5">
      <figure>
        <img
          src={image}
          alt={name}
          className="w-[14rem] h-[14rem] bg-center mt-10 xl:mt-0"
        />
      </figure>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold ">{name}</h2>
        <p className="max-h-[5rem] overflow-y-auto">{description}</p>
        <div className="justify-end">
          <button onClick={() => router.push(`/offer/${_id}`)} className="btn">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatigoryOfferCard;
