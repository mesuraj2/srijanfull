import { useRouter } from 'next/router';
import React from 'react';

const CatigoryOfferCard = ({name, description, image,_id,chatlink}) => {
    const router = useRouter();
  return (
    <div className="card card-side bg-base-100 shadow-xl  xl:w-[25rem] 14xl:w-[28rem]  flex-row md:flex-col w-[25rem] h-[15rem] md:h-[30rem] md:w-[20rem] xl:flex-row xl:h-[15rem]">
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
