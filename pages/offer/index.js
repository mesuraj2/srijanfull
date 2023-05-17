import { useRouter } from 'next/router';
import React from 'react';
import Carousel from '../../components/Carousel';
import FooterT2 from '../../components/FooterT2';
import NavbarT2 from '../../components/NavbarT2';
import OfferBadges from '../../components/OfferBadges';
import SearchBar from '../../components/SearchBar';
import { ImLocation } from 'react-icons/im';

const index = () => {
  const imageLinks = {
    offerName: 'https://i.ytimg.com/vi/cBU87-41urA/maxresdefault.jpg',
    offerImag1:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkOYMM5349QtMehTFrnjxJ2QZeTbejMs6dDoEsBNz5GJ5iSqBEo9qIfkL3VWuFQdPkbKI&usqp=CAU',
  };
  const badgeList = ['puma', 'discount', 'hot', 'shoes', 'Sneakers'];
  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="w-[90%] mx-auto">
        <NavbarT2 />
        <div className="flex items-center justify-center mx-auto mt-10 lg:my-10">
          <SearchBar
            globalClassName={''}
            inputClassName={'w-[100%] md:w-[35rem]'}
          />
        </div>
        <div className="my-[2rem]">
          <div className="flex flex-row gap-10">
            <div className="14xl:w-[28rem] 14xl:h-[28rem] w-[20rem] h-[20rem] md:w-[24rem] md:h-[24rem] rounded-md">
              <Carousel imageLinks={imageLinks} />
            </div>
            <div className="my-[2rem] flex flex-col gap-5">
              <div className="flex flex-row gap-10 items-center ">
                <p className="uppercase text-black/70 text-[1.5rem] main__font  font-[600]">
                  Puma
                </p>
                <OfferBadges badgeList={badgeList} />
              </div>
              <h2 className="tracking-wider text-black/90 secondary_font text-[1.3rem]">
                Save 20% On Purchase Of 2 Sneakers
              </h2>
              <p className="tracking-wider text-black/60 secondary_font text-[1.15rem]">
                PUMA Sunny Saving Days - Save 20% on Purchase of 2 Sections in
                Off sitewide. Shop Your Favorite Styles Now.
              </p>
              <div className="tracking-wider text-black/50 secondary_font text-[.9rem] flex flex-row items-center gap-2">
                <ImLocation />
                <p>
                  H No 3/6/111/7 & 6, GF & 1st Flr, Puma Store, Liberty Main Rd
                  Himayat Ngr Hyderabad - 500029
                </p>
              </div>

              <button className="btn w-fit btn-outline flex flex-row gap-2 items-center mt-5">
                <p>Add to Cart</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
              <button className="btn btn-error text-white secondary_font text-[1.15rem] mt-5">
                Start Pooling
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterT2 />
    </div>
  );
};

export default index;
