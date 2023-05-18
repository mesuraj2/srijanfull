import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import CatigoryCard from '../../components/CatigoryCard';
import FooterT2 from '../../components/FooterT2';
import NavbarT2 from '../../components/NavbarT2';
import axios from 'axios';

const categories = () => {
  const router = useRouter();
  const handleClick = (catigoryName) => {
    router.push(`/categories/${catigoryName}`);
  };

  const [categorieslist, setcategorieslist] = useState([]);
  const onLoad = () => {
    const res = axios.get("/api/offer/categories")
      .then((res) => {
        setcategorieslist(res.data);
      })

  }

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="w-[90%] mx-auto ">
        <NavbarT2 />
        <div className="mt-[2rem] flex flex-col gap-10">
          <h1 className="text-center text-[3rem] md:text-[4rem] main__font tracking-wider mt-10">
            Just Explore
          </h1>
          <p className="text-[1.1rem] md:text-[1.2rem] secondary_font tracking-wider text-center md:w-[75%] mx-auto ">
            Our carefully selected offers come from the best brands and trusted
            partners, so you can enjoy savings on the things you love most
          </p>
          <div className="grid md:grid-cols-2 11xl:grid-cols-4 lg:grid-cols-3 gap-x-5 gap-y-10 pb-[5rem] mx-auto">
          {categorieslist && categorieslist.map(category => 
          <CatigoryCard name={category.name} description={category.description} image={category.image} link={category.name} handleClick={handleClick}/>)}
          </div>
        </div>
      </div>
      <FooterT2 />
    </div>
  );
};

export default categories;
