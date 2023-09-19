import { useRouter } from "next/router";
import React from "react";

const CatigoryDisplay = () => {
  const router = useRouter();
  return (
    <div className="w-screen py-[1rem] md:py-[4rem] flex flex-col gap-10 bg-[#FFA500] text-white/90">
      <h1 className="text-center text-[3rem] md:text-[4rem] main__font tracking-wider">
        Categories
      </h1>
      <p className="text-[.9rem] xs:text-[1rem] md:text-[1.2rem] secondary_font tracking-wider text-center w-[90%] md:w-[75%] mx-auto ">
        Our carefully selected offers come from the best brands and trusted
        partners, so you can enjoy savings on the things you love most
      </p>
      <div className="w-[90%] md:w-[80%] flex flex-col mx-auto items-center">
        <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-2 gap-3 md:gap-10">
          <img
            src="assets/categories/image3.png"
            alt=""
            className="6xl:w-[20rem] w-[13rem]  xl:w-[18rem] rounded-[70px] shadow-md"
          />
          <img
            src="assets/categories/image4.png"
            alt=""
            className="6xl:w-[20rem] w-[13rem]  xl:w-[18rem] rounded-[70px] shadow-md"
          />
          <img
            src="assets/categories/image2.png"
            alt=""
            className="6xl:w-[20rem] w-[13rem]  xl:w-[18rem] rounded-[70px] shadow-md"
          />
          <img
            src="assets/categories/image1.png"
            alt=""
            className="6xl:w-[20rem] w-[13rem]  xl:w-[18rem] rounded-[70px] shadow-md "
          />
        </div>
      </div>
    </div>
  );
};

export default CatigoryDisplay;
