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
      1: 'https://picapool.nyc3.digitaloceanspaces.com/clothing/image_1.jpg',
      2: 'https://picapool.nyc3.digitaloceanspaces.com/clothing/image_2.jpg',
      3: 'https://picapool.nyc3.digitaloceanspaces.com/clothing/image_3.jpg',
      4: 'https://picapool.nyc3.digitaloceanspaces.com/clothing/image_4.jpg',
      5: 'https://picapool.nyc3.digitaloceanspaces.com/clothing/image_5.jpg',
      6: 'https://picapool.nyc3.digitaloceanspaces.com/clothing/image_6.jpg',
      7: 'https://picapool.nyc3.digitaloceanspaces.com/clothing/image_7.jpg',
    },
  },
  {
    name: 'Cab Share',
    discription: 'Lorem, this is a different language Facere, aliquam!',
    gifUrl:
      'https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?cs=srgb&dl=pexels-pok-rie-2049422.jpg&fm=jpg',
    imgName: 'cab',
    imgLinks: {
      1: 'https://picapool.nyc3.digitaloceanspaces.com/cab/image_1.jpg',
      2: 'https://picapool.nyc3.digitaloceanspaces.com/cab/image_2.jpg',
      3: 'https://picapool.nyc3.digitaloceanspaces.com/cab/image_3.jpg',
      4: 'https://picapool.nyc3.digitaloceanspaces.com/cab/image_4.jpg',
      5: 'https://picapool.nyc3.digitaloceanspaces.com/cab/image_5.jpg',
      6: 'https://picapool.nyc3.digitaloceanspaces.com/cab/image_6.jpg',
    },
  },
  {
    name: 'Food',
    discription: 'Lorem, this is a different language Facere, aliquam!',
    gifUrl:
      'https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?cs=srgb&dl=pexels-pok-rie-2049422.jpg&fm=jpg',
    imgName: 'food',
    imgLinks: {
      1: 'https://picapool.nyc3.digitaloceanspaces.com/food/image_1.jpg',
      2: 'https://picapool.nyc3.digitaloceanspaces.com/food/image_2.jpg',
      3: 'https://picapool.nyc3.digitaloceanspaces.com/food/image_3.jpg',
      4: 'https://picapool.nyc3.digitaloceanspaces.com/food/image_4.jpg',
      5: 'https://picapool.nyc3.digitaloceanspaces.com/food/image_5.jpg',
      6: 'https://picapool.nyc3.digitaloceanspaces.com/food/image_6.jpg',
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
      1: 'https://picapool.nyc3.digitaloceanspaces.com/grocery/image_1.jpg',
      2: 'https://picapool.nyc3.digitaloceanspaces.com/grocery/image_2.jpg',
      3: 'https://picapool.nyc3.digitaloceanspaces.com/grocery/image_3.jpg',
      4: 'https://picapool.nyc3.digitaloceanspaces.com/grocery/image_4.jpg',
      5: 'https://picapool.nyc3.digitaloceanspaces.com/grocery/image_5.jpg',
      6: 'https://picapool.nyc3.digitaloceanspaces.com/grocery/image_6.jpg',
    },
  },
  {
    name: 'Miscellaneous',
    discription: 'Lorem, this is a different language Facere, aliquam!',
    gifUrl:
      'https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?cs=srgb&dl=pexels-pok-rie-2049422.jpg&fm=jpg',
    imgName: 'cricket',
    imgLinks: {
      1: 'https://picapool.nyc3.digitaloceanspaces.com/cricket/image_1.jpg',
      2: 'https://picapool.nyc3.digitaloceanspaces.com/cricket/image_2.jpg',
      3: 'https://picapool.nyc3.digitaloceanspaces.com/cricket/image_3.jpg',
      4: 'https://picapool.nyc3.digitaloceanspaces.com/cricket/image_4.jpg',
      5: 'https://picapool.nyc3.digitaloceanspaces.com/cricket/image_5.jpg',
      6: 'https://picapool.nyc3.digitaloceanspaces.com/cricket/image_6.jpg',
    },
  },
];

const About = () => {
  const [tabSelected, setTabSelected] = useState('Clothing');
  return (
    <div className="w-[80vw] mx-auto bg-[#B9E9FC] py-10">
      <h3 className="text-[1.8rem] md:text-[2.3rem] 14xl:text-[2.3rem] secondary_font font-[600] tracking-wider text-black/70 underline text-center">
        Our Story
      </h3>
      <div className="flex flex-col items-center justify-center">
        <p className="text-[1rem] md:text-[1.1rem] 14xl:text-[1.2rem] secondary_font tracking-wider text-justify my-5 w-full lg:w-[90%]">
          The idea for pica pool was born out of a incident (One day, I walked
          into a pizza store and noticed a tempting offer of &quot;Buy 2, Get 1
          Free.&quot; The price of the pizza was around 360 rupees. It got me
          thinking: If I could find two more people interested in the same
          pizza, we could each get pizza for only 240 rupees instead of the
          original 360 rupees. That&apos;s a whopping 33.3% in savings!)
        </p>
        <p className="text-[1rem] md:text-[1.1rem] 14xl:text-[1.2rem] secondary_font tracking-wider text-justify my-5 w-full lg:w-[90%]">
          Inspired by this experience, I realized the immense potential of
          pooling. It&apos;s not just limited to pizzas; it applies to every
          domain. We recognized that by bringing people together with similar
          product interests, we could create a community that harnesses
          collective buying power to unlock exclusive discounts and savings.
          Thus, pica pool was founded with the vision of empowering individuals
          to save more and enjoy a better shopping experience.
        </p>
      </div>
      {/* <h1 className="text-center text-[3rem] md:text-[4rem] main__font tracking-wider">
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
      </div> */}
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
