import React from 'react';

const CatigoryOfferCard = ({name, description, image, chatlink}) => {
  //Need to update if user joins chat or create new chat
  // Would be better if chat option is written maybe
  return (
    <div className="card card-side bg-base-100 shadow-xl xl:w-[25rem] 14xl:w-[28rem]  flex-col h-[30rem] w-[20rem] xl:flex-row xl:h-[15rem]">
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
          <button className="btn ">Join Chat</button>
        </div>
      </div>
    </div>
  );
};

export default CatigoryOfferCard;
