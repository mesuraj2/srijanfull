import { useRouter } from 'next/router';
import React from 'react';

const CatigoryOfferCard = ({ name, description, image, _id, chatlink }) => {
  const router = useRouter();
  return (
    <div className="card card-side bg-base-100 shadow-xl    flex-col mx-auto h-[30rem] w-[20rem] ">
      <figure>
        <img
          src={image}
          alt={name}
          className="w-[14rem] h-[14rem] bg-center mt-10 xl:mt-0"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button onClick={() => router.push(`/offer/${_id}`)} className="btn">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatigoryOfferCard;
