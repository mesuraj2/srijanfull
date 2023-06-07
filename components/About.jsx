import React, { useState } from 'react';
import Carousel from './Carousel';

const featuresData = [
  {
    name: 'Clothing',
    discription:
      'Feature 2 discription is here adipisicing elit. Facere, aliquam!',
    gifUrl:
      'https://c4.wallpaperflare.com/wallpaper/87/851/622/laptop-backgrounds-nature-images-1920x1200-wallpaper-preview.jpg',
    imgName: 'clothing',
    imgLinks: {
      1: '/assets/clothing/image_1.jpg',
      2: '/assets/clothing/image_2.jpg',
      3: '/assets/clothing/image_3.jpg',
      4: '/assets/clothing/image_4.jpg',
      5: '/assets/clothing/image_5.jpg',
      6: '/assets/clothing/image_6.jpg',
      7: '/assets/clothing/image_7.jpg',
    },
  },
  {
    name: 'Cab Share',
    discription: 'Lorem, this is a different language Facere, aliquam!',
    gifUrl:
      'https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?cs=srgb&dl=pexels-pok-rie-2049422.jpg&fm=jpg',
    imgName: 'cab',
    imgLinks: {
      1: '/assets/cab/image_1.jpg',
      2: '/assets/cab/image_2.jpg',
      3: '/assets/cab/image_3.jpg',
      4: '/assets/cab/image_4.jpg',
      5: '/assets/cab/image_5.jpg',
      6: '/assets/cab/image_6.jpg',
    },
  },
  {
    name: 'Food',
    discription: 'Lorem, this is a different language Facere, aliquam!',
    gifUrl:
      'https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?cs=srgb&dl=pexels-pok-rie-2049422.jpg&fm=jpg',
    imgName: 'food',
    imgLinks: {
      1: '/assets/food/image_1.jpg',
      2: '/assets/food/image_2.jpg',
      3: '/assets/food/image_3.jpg',
      4: '/assets/food/image_4.jpg',
      5: '/assets/food/image_5.jpg',
      6: '/assets/food/image_6.jpg',
    },
  },
  {
    name: 'Grocery',
    discription:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, iure.',
    gifUrl:
      'https://e0.pxfuel.com/wallpapers/520/1013/desktop-wallpaper-cool-landscape-night-minimal-art-laptop-minimalist-and-background-minimalist-laptop.jpg',
    imgName: 'grocery',
    imgLinks: {
      1: '/assets/grocery/image_1.jpg',
      2: '/assets/grocery/image_2.jpg',
      3: '/assets/grocery/image_3.jpg',
      4: '/assets/grocery/image_4.jpg',
      5: '/assets/grocery/image_5.jpg',
      6: '/assets/grocery/image_6.jpg',
    },
  },
  {
    name: 'Miscellaneous',
    discription: 'Lorem, this is a different language Facere, aliquam!',
    gifUrl:
      'https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?cs=srgb&dl=pexels-pok-rie-2049422.jpg&fm=jpg',
    imgName: 'cricket',
    imgLinks: {
      1: '/assets/cricket/image_1.jpg',
      2: '/assets/cricket/image_2.jpg',
      3: '/assets/cricket/image_3.jpg',
      4: '/assets/cricket/image_4.jpg',
      5: '/assets/cricket/image_5.jpg',
      6: '/assets/cricket/image_6.jpg',
    },
  },
];

const About = () => {
  const [tabSelected, setTabSelected] = useState('Clothing');
  return (
    <div className="w-screen bg-[#B9E9FC]">
      <h1 className="text-center text-[3rem] md:text-[4rem] main__font tracking-wider">
        Features
      </h1>
      <div className="flex flex-col justify-center items-center">
        <ul className="flex flex-row w-full justify-center gap-5 md:gap-10 secondary_font text-[1rem] xs:text-[1.2rem] md:text-[1.6rem] my-[1rem] tracking-wider   p-3 mx-auto  px-5">
          {featuresData.map((item, index) => {
            return (
              <li
                key={index}
                className={`${
                  tabSelected === item.name
                    ? 'border-b-black/80  border-b-4 font-[600] text-black/70 -translate-y-[2px]'
                    : ''
                } cursor-pointer hover:-translate-y-1 transition-all ${
                  index > 2 ? 'hidden lg:flex' : 'flex'
                }`}
                onClick={() => setTabSelected(item.name)}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
        <div className="text-[1rem] md:text-[1.2rem] md:mt-[1rem] secondary_font tracking-widest  w-[95%] md:w-[80%] lg:w-auto text-center">
          {/* {featuresData.map((item) => {
            if (item.name === tabSelected) return item.discription;
            else false;
          })} */}
        </div>
        <div className="mt-[2rem] w-screen">
          {featuresData.map((item, index) => {
            if (item.name === tabSelected)
              return (
                <Carousel
                  nav={true}
                  key={index}
                  imageLinks={item.imgLinks}
                  className={''}
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

{
  /* <img
  src={item.gifUrl}
  alt=""
  className=""
/> */
}
