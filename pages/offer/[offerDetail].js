import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Carousel from '../../components/Carousel';
import FooterT2 from '../../components/FooterT2';
import NavbarT2 from '../../components/NavbarT2';
import OfferBadges from '../../components/OfferBadges';
import SearchBar from '../../components/SearchBar';
import { ImLocation } from 'react-icons/im';
import axios from 'axios';

const Index = ({ data }) => {
  let imglinks = new Object();
  if (data.image) {
    for (var i = 0; i < data.image.length; i++) {
      // imglinks.set(i,data.image[i])
      imglinks[i] = data.image[i];
    }
  }
  const router = useRouter();
  // const badgeList = ['puma', 'discount', 'hot', 'shoes', 'Sneakers'];
  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="flex items-center justify-center mx-auto mt-10 lg:my-10">
        <SearchBar
          globalClassName={''}
          inputClassName={'w-[100%] md:w-[35rem]'}
        />
      </div>
      <div className="pb-[2rem] pt-[4rem]">
        <div className="flex flex-col md:flex-row gap-5 lg:gap-10 ">
          <div className="14xl:w-[28rem] 14xl:h-[28rem] w-[18rem] h-[18rem] xs:w-[20rem] xs:h-[20rem] md:w-[24rem] md:h-[24rem] rounded-md flex flex-col items-center justify-center mx-auto md:mx-0">
            <Carousel imageLinks={imglinks} />
            <button className="btn w-fit btn-outline flex flex-row gap-2 items-center mt-5 mx-auto">
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
          </div>
          <div className=" flex flex-col gap-5 items-center justify-center md:items-start md:justify-start mt-[5rem] md:mt-10">
            <div className="flex flex-row gap-10 items-center">
              <p className="uppercase text-black/70 text-[1.5rem] main__font  font-[600]">
                {data.offername}
              </p>
              {data.tags ? <OfferBadges badgeList={data.tags} /> : ''}
            </div>
            <h2 className="tracking-wider text-black/90 secondary_font text-[1.3rem]">
              {data.smalldescription ? data.smalldescription : ''}
            </h2>
            <p className="tracking-wider text-black/70 secondary_font text-[1.15rem]">
              {data.description}
            </p>
            <div className="tracking-wider text-black/50 secondary_font text-[.8rem] xs:text-[.9rem] flex flex-row items-center gap-2 ">
              {data.locationdescription ? (
                <div className="flex gap-1">
                  <ImLocation className="mt-1" />
                  <p>{data.locationdescription}</p>
                </div>
              ) : (
                ''
              )}
            </div>

            <button
              onClick={() =>
                router.push(
                  `/radar/${data._id}?location=${localStorage.getItem(
                    'coordinates'
                  )}`
                )
              }
              className="btn btn-error text-white secondary_font bg-red-500 mt-5 w-fit mx-auto text-[1.2rem]"
            >
              Pool Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const offerid = context.query.offerDetail;
  const { data } = await axios.post(
    '/api/offer/offerchats',
    {
      id: offerid,
    }
  );
  console.log(data);
  return {
    props: { data: data }, // will be passed to the page component as props
  };
}
