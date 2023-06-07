import React from 'react';

const MiniNotification = () => {
  return (
    <div className="bg-white p-5 rounded-2xl">
      <div className="flex flex-col ">
        <div className="flex flex-row items-center justify-between">
          <p>Chat Name</p>
          <p>10:45 PM</p>
        </div>
        <div className="flex flex-row items-center gap-3">
          <p className="w-[12rem] truncate">
            Chat description is this the one this is the one this is the one
          </p>
          <button className="btn">Join Chat</button>
        </div>
      </div>
    </div>
  );
};

export default MiniNotification;
