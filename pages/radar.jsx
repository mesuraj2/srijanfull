import Image from 'next/image';
import React from 'react';
import FooterT2 from '../components/FooterT2';
import NavbarT2 from '../components/NavbarT2';

const ChatCard = () => {
  return (
    <div className="flex flex-row bg-white py-3 px-5 justify-center items-center gap-8 m-3">
      <p>Adidas shoe chat</p>
      <div className="radial-progress" style={{ '--value': 80 }}>
        4/5
      </div>
      <div className="flex flex-col items-center justify-center">
        <div>
          <p>Chat expires in</p>
          <span className="countdown font-mono text-2xl">
            <span style={{ '--value': 10 }}></span>:
            <span style={{ '--value': 24 }}></span>:
            <span style={{ '--value': 3 }}></span>
          </span>
        </div>
      </div>
      <button className="btn">Join Chat</button>
    </div>
  );
};

const JoinChatPanel = () => {
  return (
    <div className="rounded-md p-5 bg-white/70">
      <ChatCard />
      <ChatCard />
      <div className="divider">OR</div>
      <button className="btn btn-error text-white secondary_font bg-red-500 mt-5 mx-auto text-[1.2rem] w-full capitalize">
        Create your own chat room
      </button>
    </div>
  );
};

const CreateChatForm = () => {
  return (
    <div className="rounded-md p-5 bg-white/70 ">
      <div className="form-control max-w-xs flex flex-col gap-2 w-[30rem]">
        <label className="label">
          <span className="label-text">Chat Name</span>
        </label>
        <input
          type="text"
          placeholder=""
          className="input input-bordered w-full max-w-xs"
        />

        <label className="label">
          <span className="label-text">Chat Discription</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder=""
        ></textarea>
        <label>
          <span className="label-text">Expires in</span>
        </label>
        <select className="select w-full max-w-xs">
          <option disabled selected>
            10 minutes
          </option>
          <option>5 minutes</option>
          <option>10 minutes</option>
          <option>30 minutes</option>
          <option>45 minutes</option>
          <option>1 hour</option>
        </select>
        <button className="btn btn-error text-white secondary_font bg-red-500 mt-5 mx-auto text-[1rem]  w-full">
          Create Chat
        </button>
      </div>
    </div>
  );
};

const radar = () => {
  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="w-[90%] mx-auto">
        <NavbarT2 />
        <div className="my-[5rem] flex flex-row justify-center gap-[5rem] items-center">
          <div className="flex flex-col gap-5 ">
            <img src="/img/map.jpg" className="w-[40rem]" alt="image" />
            <select className="select  w-[40rem]">
              <option disabled selected>
                Pick Radius
              </option>
              <option>100 m</option>
              <option>200 m</option>
              <option>500 m</option>
              <option>1 km</option>
              <option>2 km</option>
            </select>
          </div>
          <div className="">
            {/* <button className="btn btn-error text-white secondary_font bg-red-500 mt-5 mx-auto text-[1.2rem]  w-[10rem]">
              Search
            </button> */}
            {/* <JoinChatPanel /> */}
            <CreateChatForm />
          </div>
        </div>
      </div>
      <FooterT2 />
    </div>
  );
};

export default radar;
