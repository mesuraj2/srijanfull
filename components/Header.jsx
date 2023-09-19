import React from "react";
import Carousel from "./Carousel";

const Header = () => {
  return (
    <div className=" md:py-[4rem] bg-[#FFA500] mt-5">
      <div className="flex flex-col lg:flex-row gap-[2rem]  justify-center mt-5 items-center w-[90%] 14xl:w-[80%] mx-auto">
        <div className="w-[95%] md:w-[80%] lg:w-[60%] xl:w-[45%] 14xl:w-[50%] flex flex-col gap-5 lg:items-start items-center justify-center lg:mb-auto mx-auto mb-5 md:mb-0 md:mt-[1rem] mt-[3rem]">
          <h1 className="text-[1.8rem] md:text-[2.3rem] 14xl:text-[2.3rem] main__font font-[500] tracking-wider text-white/95 ">
            Redefining the Art of Saving
          </h1>

          <p className="text-[1rem] md:text-[1.1rem] 14xl:text-[1.2rem] secondary_font text-white/95 tracking-wider text-justify">
            At <span className="font-[600]">Picapool</span>, we believe in the
            power of collaboration for bigger savings. Our platform connects
            people looking for the similar products, allowing them to pool their
            orders and access exclusive discounts. Join our community of smart
            shoppers and discover a new way to save. Start maximizing your
            savings with <span className="font-[600]">Picapool</span> today.
          </p>

          <div className="flex flex-row gap-10 mt-5 mr-auto"></div>
          {/* <a href='https://play.google.com/store/apps/details?id=com.picapool'> */}
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.picapool"
            rel="noreferrer"
          >
            <img
              className=" h-24"
              alt="Get it on Google Play"
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            />
          </a>
        </div>
        <div className="gradient-bg w-[16rem] md:w-[50%] mx-auto hidden lg:block">
          <img
            src="assets/header.png"
            alt="pica-pool-logo"
            className="w-[16rem] lg:w-[26rem] mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
