import React, { useState } from 'react';

const featuresData = [
  {
    name: 'Feature 1',
    discription:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, iure.',
    gifUrl: 'https://media.giphy.com/media/SpopD7IQN2gK3qN4jS/giphy.gif',
  },
  {
    name: 'Feature 2',
    discription:
      'Feature 2 discription is here adipisicing elit. Facere, aliquam!',
    gifUrl: 'https://media.giphy.com/media/Xx8oPvnAbgXSg/giphy.gif',
  },
  {
    name: 'Feature 3',
    discription: 'Lorem, this is a different language Facere, aliquam!',
    gifUrl: 'https://media.giphy.com/media/U3UnKI6LjrsPqCGgf9/giphy.gif',
  },
];

const About = () => {
  const [tabSelected, setTabSelected] = useState('Feature 1');
  return (
    <div className="w-screen h-screen py-[5rem] bg-[#B9E9FC]">
      <h1 className="text-center text-[4rem] main__font tracking-wider">
        Features
      </h1>
      <div className="flex flex-col justify-center items-center">
        <ul className="flex flex-row w-ful justify-center gap-10 secondary_font text-[1.6rem] my-[1rem] tracking-wider  w-fit  p-3 mx-auto  px-5">
          {featuresData.map((item, index) => {
            return (
              <li
                className={`${
                  tabSelected === item.name
                    ? 'border-b-black/80 border-b-4 font-[600] text-black/70 -translate-y-[2px]'
                    : ''
                } cursor-pointer hover:-translate-y-1 transition-all`}
                onClick={() => setTabSelected(item.name)}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
        <div className="text-[1.2rem] mt-[1rem] secondary_font tracking-widest text-justify">
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
                  className="w-[55rem] h-[30rem] rounded-md"
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
