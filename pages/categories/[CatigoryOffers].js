import { useRouter } from 'next/router';
import React from 'react';
import FooterT2 from '../../components/FooterT2';
import NavbarT2 from '../../components/NavbarT2';
import { FaFilter } from 'react-icons/fa';
import SearchBar from '../../components/SearchBar';
import Filter from '../../components/offer/filter';
import CatigoryOfferCard from '../../components/CatigoryOfferCard';

const index = () => {
  const rep = [1, 2, 3, 4, 5, 6, 77, 8, 9];
  const router = useRouter();
  const catigoryName = router.query.CatigoryOffers;
  console.log(catigoryName);
  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="w-[90%] mx-auto">
        <NavbarT2 />
        <h1 className="text-center text-[4rem] main__font tracking-wider mt-10">
          {catigoryName}
        </h1>
        <p className="text-[1.2rem] secondary_font tracking-wider text-center w-[75%] mx-auto ">
          Step up your style with our unbeatable selection of shoes! From sporty
          sneakers to sleek dress shoes, we've got you covered for any occasion.
          Browse our categories and step out in style today!
        </p>
        <div className="flex items-center justify-center mx-auto  mt-10">
          <SearchBar globalClassName={''} inputClassName={'w-[28rem]'} />
        </div>
        <div className="drawer drawer-mobile h-auto my-20">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center ">
            {/* <!-- Page content here --> */}

            <div className="flex flex-col gap-5">
              <div className="ml-auto">
                <label
                  htmlFor="my-drawer-2"
                  className="btn drawer-button lg:hidden"
                >
                  <div className="flex flex-row gap-2">
                    <FaFilter />
                    Filters
                  </div>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-x-5  gap-y-5">
                {rep.map((item, index) => {
                  return <CatigoryOfferCard />;
                })}
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
            <div className="flex flex-col gap-5 p-4 mt-4 lg:w-[16rem] xl:w-[18rem] 2xl:w-[22rem] bg-base-100 text-base-content  rounded-md ">
              <div>
                <Filter />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterT2 />
    </div>
  );
};

export default index;
