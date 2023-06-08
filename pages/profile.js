import React from 'react';

const profile = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 my-[5rem]">
      <img
        src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
        alt=""
        className="rounded-full h-[12rem] w-[12rem] bg-center"
      />
      <p>Username</p>
    </div>
  );
};

export default profile;
