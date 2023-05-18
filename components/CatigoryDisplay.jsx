import { useRouter } from 'next/router';
import React from 'react';

const CatigoryDisplay = () => {
  const router = useRouter();
  return (
    <div className="w-screen md:pt-[4rem]  mb-[8rem] bg-[#B9E9FC] flex flex-col gap-10">
      <h1 className="text-center text-[3rem] md:text-[4rem] main__font tracking-wider mt-10">
        Catigories
      </h1>
      <p className="text-[1rem] md:text-[1.2rem] secondary_font tracking-wider text-center w-[90%] md:w-[75%] mx-auto ">
        Our carefully selected offers come from the best brands and trusted
        partners, so you can enjoy savings on the things you love most
      </p>
      <div className="w-[80%] flex flex-col mx-auto items-center">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-10">
          <img
            src="https://thypix.com/wp-content/uploads/2022/07/fruit-phone-wallpaper-thypix-5-394x700.jpg"
            alt=""
            className="w-[15rem] rounded-md shadow-md"
          />
          <img
            src="https://thypix.com/wp-content/uploads/2022/07/fruit-phone-wallpaper-thypix-68-394x700.jpg"
            alt=""
            className="w-[15rem] rounded-md shadow-md"
          />
          <img
            src="https://thypix.com/wp-content/uploads/2022/06/orange-phone-wallpaper-51-394x700.jpg"
            alt=""
            className="w-[15rem] rounded-md shadow-md"
          />
          <img
            src="https://thypix.com/wp-content/uploads/2022/07/fruit-phone-wallpaper-thypix-79-394x700.jpg"
            alt=""
            className="w-[15rem] rounded-md shadow-md"
          />
        </div>
        <button
          onClick={() => router.push('/categories')}
          class="btn btn-outline tracking-wide text-[1.1rem] my-10"
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default CatigoryDisplay;
