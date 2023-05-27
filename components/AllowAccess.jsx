import React from 'react';

const AllowAccess = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center py-[2rem]">
      {' '}
      <img
        src="https://media.giphy.com/media/SWWLF8WluVJ5vJjMln/giphy.gif"
        alt=""
        className="w-[10rem]"
      />
      <p>Please allow access to location to proceed</p>
      <button className="btn btn-outline">Allow Access</button>
    </div>
  );
};

export default AllowAccess;
