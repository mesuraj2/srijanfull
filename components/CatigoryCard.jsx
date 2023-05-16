import React from 'react';

const CatigoryCard = ({ handleClick }) => {
  return (
    <div className="card card-compact flex flex-row md:flex-col w-[100%] md:w-[15rem] xl:w-[18rem] bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://media.wired.com/photos/6154ba291b38af32f7638ffd/1:1/w_1800,h_1800,c_limit/Gear-Barefoot-Shoes-Freet-Tanga-SOURCE-Freet.jpg"
          alt="Shoes"
          className="w-[10rem] lg:w-[12rem] xl:w-[15rem] md:mt-10 ml-5 md:ml-0"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button
            className="btn text-[.8rem] md:text-[.9rem]"
            onClick={() => handleClick('shoes')}
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatigoryCard;
