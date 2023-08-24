import { useRouter } from 'next/router';
import React from 'react';

const CatigoryDisplay = () => {
  const router = useRouter();
  return (
    <div className="w-screen md:pt-[4rem]  mb-[8rem] bg-[#B9E9FC] flex flex-col gap-10">
      <h1 className="text-center text-[3rem] md:text-[4rem] main__font tracking-wider mt-10">
        Categories
      </h1>
      <p className="text-[.9rem] xs:text-[1rem] md:text-[1.2rem] secondary_font tracking-wider text-center w-[90%] md:w-[75%] mx-auto ">
        Our carefully selected offers come from the best brands and trusted
        partners, so you can enjoy savings on the things you love most
      </p>
      <div className="w-[90%] md:w-[80%] flex flex-col mx-auto items-center">
        <div className="grid lg:grid-cols-2 grid-cols-2 gap-3 md:gap-10">
          <img
            src="assets/categories/Food.png"
            alt=""
            className="6xl:w-[20rem] w-[13rem]  xl:w-[28rem] rounded-md shadow-md "
          />
          <img
            src="assets/categories/Cab.png"
            alt=""
            className="6xl:w-[20rem] w-[13rem]  xl:w-[28rem] rounded-md shadow-md"
          />
          <img
            src="assets/categories/Grocery.png"
            alt=""
            className="6xl:w-[20rem] w-[13rem]  xl:w-[28rem] rounded-md shadow-md"
          />
          <img
            src="assets/categories/Clothing.png"
            alt=""
            className="6xl:w-[20rem] w-[13rem]  xl:w-[28rem] rounded-md shadow-md"
          />
        </div>
        {/* <button
          onClick={() => router.push('/categories')}
          className="btn btn-outline tracking-wide text-[1.1rem] my-10"
        >
          Explore More
        </button> */}
      </div>
    </div>
  );
};

export default CatigoryDisplay;
