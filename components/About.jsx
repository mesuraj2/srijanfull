import React, { useState } from 'react';

const featuresData = [
  {
    name: 'Feature 1',
    discription:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, iure.',
    gifUrl:
      'https://e0.pxfuel.com/wallpapers/520/1013/desktop-wallpaper-cool-landscape-night-minimal-art-laptop-minimalist-and-background-minimalist-laptop.jpg',
  },
  {
    name: 'Feature 2',
    discription:
      'Feature 2 discription is here adipisicing elit. Facere, aliquam!',
    gifUrl:
      'https://c4.wallpaperflare.com/wallpaper/87/851/622/laptop-backgrounds-nature-images-1920x1200-wallpaper-preview.jpg',
  },
  {
    name: 'Feature 3',
    discription: 'Lorem, this is a different language Facere, aliquam!',
    gifUrl:
      'https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?cs=srgb&dl=pexels-pok-rie-2049422.jpg&fm=jpg',
  },
];

const About = () => {
  const [tabSelected, setTabSelected] = useState('Feature 1');
  return (
    <div className="w-screen py-[5rem] bg-[#B9E9FC]">
      <h1 className="text-center text-[3rem] md:text-[4rem] main__font tracking-wider">
        Features
      </h1>
      <div className="flex flex-col justify-center items-center">
        <ul className="flex flex-row w-ful justify-center gap-5 md:gap-10 secondary_font text-[1.2rem] md:text-[1.6rem] my-[1rem] tracking-wider  w-fit  p-3 mx-auto  px-5">
          {featuresData.map((item, index) => {
            return (
              <li
                className={`${
                  tabSelected === item.name
                    ? 'border-b-black/80 border-b-4 font-[600] text-black/70 -translate-y-[2px]'
                    : ''
                } cursor-pointer hover:-translate-y-1 transition-all `}
                onClick={() => setTabSelected(item.name)}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
        <div className="text-[1rem] md:text-[1.2rem] mt-[1rem] secondary_font tracking-widest  w-[90%] md:w-[80%] lg:w-auto text-center">
          {featuresData.map((item) => {
            if (item.name === tabSelected) return item.discription;
            else false;
          })}
        </div>
        <div className="mt-[2rem]">
          {featuresData.map((item) => {
            if (item.name === tabSelected)
              return (
                <img
                  src={item.gifUrl}
                  alt=""
                  className="mx-auto w-[90%] md:w-[40rem] lg:w-[55rem] lg:h-[30rem] rounded-md"
                />
              );
            else false;
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
