import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import FooterT2 from '../../components/FooterT2';
import NavbarT2 from '../../components/NavbarT2';
import { FaFilter } from 'react-icons/fa';
import SearchBar from '../../components/SearchBar';
import Filter from '../../components/offer/filter';
import CatigoryOfferCard from '../../components/CatigoryOfferCard';
import axios from 'axios';
import Notification from '../../components/notification';

const Index = ({ categoryoffers }) => {
  // Explanation
  // 'checked' will give the current checked radius
  // if 'checked' is changed it will change the url with radius query as checked
  // so backend will fetch offers with the 'checked' radius

  // Thinking of using context provider instead of prop drilling

  const [drawerCheck, setdrawerCheck] = useState(false);
  function handleClick() {
    setdrawerCheck(!drawerCheck);
  }

  const [checked, setChecked] = useState('');
  const distancedict = {
    '200 m': 200,
    '500 m': 500,
    '1 km': 1000,
    '2 km': 2000,
    '5 km': 5000,
  };
  //Updating this will change number of items in categories/categoryoffer
  const router = useRouter();
  const catigoryName = router.query.category;

  useEffect(() => {
    router.push({
      path: router.pathname,
      query: { ...router.query, radius: distancedict[checked] },
    });
  }, [checked]);

  return (
    <div className="w-[90%] bg-[#B9E9FC] mx-auto">
      <div hidden><Notification /></div>
      <h1 className="text-center text-[4rem] main__font tracking-wider mt-10">
        {catigoryName}
      </h1>
      <p className="text-[.9rem] xs:text-[1rem] md:text-[1.2rem] secondary_font tracking-wider  mt-5 md:mt-10 md:w-[75%] mx-auto text-justify">
        Step up your style with our unbeatable selection of shoes! From sporty
        sneakers to sleek dress shoes, we&apos;ve got you covered for any
        occasion. Browse our categories and step out in style today!
      </p>
      <div className="flex items-center justify-center mx-auto  mt-10">
        <SearchBar
          globalClassName={''}
          inputClassName={'xs:w-[22rem] 5xl:w-[28rem]'}
        />
      </div>
      <div className="ml-auto flex justify-end mt-10">
        <label
          htmlFor="my-drawer-2"
          className="btn drawer-button lg:hidden mb-5"
        >
          <button className="flex flex-row gap-2" onClick={handleClick}>
            <FaFilter />
            Filters
          </button>
        </label>
      </div>
      <div className="drawer drawer-mobile h-auto my-20">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          checked={drawerCheck}
          onChange={handleClick}
        />

        <div className="drawer-content flex flex-col items-center ">
          {/* <!-- Page content here --> */}

          <div className="flex flex-col gap-5 items-center justify-center">
            <div className="grid 6xl:grid-cols-2 9xl:grid-cols-3 w-full gap-x-5  gap-y-5 mx-auto">
              {categoryoffers &&
                categoryoffers.map((item, i) => {
                  return (
                    <CatigoryOfferCard
                      key={i}
                      _id={item._id}
                      name={item.offername}
                      image={item.image[0]}
                      description={item.description}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <div className="flex flex-col gap-5 mt-5  w-[14rem] bg-base-100 text-base-content  rounded-sm h-fit">
            <Filter checked={checked} setChecked={setChecked} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const q = context.query;
  // //console.log(q)
  // q['category'] = context.query.CatigoryOffers
  const { data } = await axios.get(
    `${process.env.DOMAIN_URI}/api/offer/categoryoffers`,
    {
      params: q,
    }
  );
  //console.log(data);
  return {
    props: { categoryoffers: data }, // will be passed to the page component as props
  };
}
