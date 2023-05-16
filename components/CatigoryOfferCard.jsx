import React from 'react';

const CatigoryOfferCard = () => {
  return (
    <div className="card card-side bg-base-100 shadow-xl xl:w-[25rem] 14xl:w-[28rem]  flex-col h-[30rem] w-[20rem] xl:flex-row xl:h-[15rem]">
      <figure>
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/31135470419998.jpg"
          alt="Movie"
          className="w-[14rem] h-[14rem] bg-center mt-10 xl:mt-0"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Puma Sneakers</h2>
        <p>save 20% on purchase of 2 sneakers</p>
        <div className="card-actions justify-end">
          <button className="btn ">Join Chat</button>
        </div>
      </div>
    </div>
  );
};

export default CatigoryOfferCard;
