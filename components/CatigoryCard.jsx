import React from 'react';

const CatigoryCard = ({ name, description, image, link, handleClick }) => {
  return (
    <div className="card card-compact flex flex-row md:flex-col w-[100%] md:w-[15rem] xl:w-[18rem] bg-base-100 shadow-xl items-center justify-center hover:-translate-y-2 transition-all">
      <img
        src={image}
        alt={name}
        className="w-[10rem] lg:w-[12rem] xl:w-[15rem] rounded-md xl:h-[15rem] md:mt-10 ml-5 md:ml-0"
      />

      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button
            className="btn text-[.8rem] md:text-[.9rem]"
            onClick={() => handleClick(link)}
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatigoryCard;
