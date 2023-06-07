import { useRouter } from 'next/router';
import React from 'react';

const CatigoryDisplay = () => {
  const router = useRouter();
  return (
    <div className="w-screen md:pt-[4rem]  mb-[8rem] bg-[#B9E9FC] flex flex-col gap-10">
      <h1 className="text-center text-[3rem] md:text-[4rem] main__font tracking-wider mt-10">
        Categories
      </h1>
      <p className="text-[1rem] md:text-[1.2rem] secondary_font tracking-wider text-center w-[90%] md:w-[75%] mx-auto ">
        Our carefully selected offers come from the best brands and trusted
        partners, so you can enjoy savings on the things you love most
      </p>
      <div className="w-[90%] md:w-[80%] flex flex-col mx-auto items-center">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-10">
          <img
            src="https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?cs=srgb&dl=pexels-markus-winkler-3812433.jpg&fm=jpg"
            alt=""
            className="6xl:w-[15rem] w-[13rem] h-full xl:h-[22rem] rounded-md shadow-md "
          />
          <img
            src="https://wallpapercave.com/wp/wp1898190.jpg"
            alt=""
            className="6xl:w-[15rem] w-[13rem] h-full xl:h-[22rem] rounded-md shadow-md"
          />
          <img
            src="https://cdn.wallpapersafari.com/65/56/28VdRZ.jpg"
            alt=""
            className="6xl:w-[15rem] w-[13rem] h-full xl:h-[22rem] rounded-md shadow-md"
          />
          <img
            src="https://c0.wallpaperflare.com/preview/38/743/765/aisle-buy-cart-food.jpg"
            alt=""
            className="6xl:w-[15rem] w-[13rem] h-full xl:h-[22rem] rounded-md shadow-md"
          />
        </div>
        <button
          onClick={() => router.push('/categories')}
          className="btn btn-outline tracking-wide text-[1.1rem] my-10"
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default CatigoryDisplay;
