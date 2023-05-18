import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import FooterT2 from '../../components/FooterT2';
import NavbarT2 from '../../components/NavbarT2';
import { FaFilter } from 'react-icons/fa';
import SearchBar from '../../components/SearchBar';
import Filter from '../../components/offer/filter';
import CatigoryOfferCard from '../../components/CatigoryOfferCard';
import FilterDrawer from '../../components/FilterDrawer';
import axios from 'axios';

const index = () => {
  //Updating this will change number of items in categories/categoryoffer
  const rep = [1, 2, 3];
  const [categoryoffers, setcategoryoffers] = useState([])
  const router = useRouter();
  const catigoryName = router.query.CatigoryOffers;
  const fetchItems = async () => {
    console.log(catigoryName)
      axios.get(`/api/offer/categoryoffers`).then((res) => { setcategoryoffers(res.data) })
    
  }

  useEffect(() => {
    fetchItems()
    console.log(categoryoffers)
  }, [])

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
        <div className="flex justify-end lg:hidden my-5">
          <FilterDrawer />
        </div>
//Its' gonna be buggy here, fix it
// <<<<<<< fronted
        <div className="flex flex-row gap-10">
          <div className="hidden lg:block">
            <FilterDrawer />
// =======
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
                  return <CatigoryOfferCard
                    name="Puma Sneakers"
                    image="https://assets.tatacliq.com/medias/sys_master/images/31135470419998.jpg"
                    description="Brand New Puma Sneakers" />;
                })}
                {categoryoffers && categoryoffers.map(item => {
                  return <CatigoryOfferCard
                    name={item.offername}
                    image={item.image[0]}
                    description={item.description} />;
                })}
              </div>
            </div>
// >>>>>>> backend
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 my-10 lg:gap-x-5  gap-y-5 items-center justify-center mx-auto">
            {rep.map((item, index) => {
              return <CatigoryOfferCard />;
            })}
          </div>
        </div>
      </div>

      <FooterT2 />
    </div>
  );
};

export default index;
