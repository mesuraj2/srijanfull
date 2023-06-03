import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import CatigoryCard from '../../components/CatigoryCard';
import FooterT2 from '../../components/FooterT2';
import NavbarT2 from '../../components/NavbarT2';
import axios from 'axios';
import { ChatState } from '../../Context/ChatProvider';

const Categories = () => {
  const router = useRouter();
  const handleClick = (catigoryName) => {
    if (localStorage.getItem('coordinates')) {
      let coordinate = JSON.parse(localStorage.getItem('coordinates'));
      console.log(coordinate);
      router.push(
        `/categories/${catigoryName}?lat=${coordinate[0]}&long=${coordinate[1]}`
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let coordinate = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          localStorage.setItem('coordinates', JSON.stringify(coordinate));
          router.push(href);
        },
        (err) => console.log(err)
      );
    }
  };

  // we will also impliment it with backend later
  const [categorieslist, setcategorieslist] = useState([]);
  const onLoad = () => {
    const res = axios.get('/api/offer/categories').then((res) => {
      setcategorieslist(res.data);
    });
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="mt-[2rem] flex flex-col gap-10">
        <h1 className="text-center text-[3rem] md:text-[4rem] main__font tracking-wider mt-10">
          Just Explore
        </h1>
        <p className="text-[1.1rem] md:text-[1.2rem] secondary_font tracking-wider text-center md:w-[75%] mx-auto ">
          Our carefully selected offers come from the best brands and trusted
          partners, so you can enjoy savings on the things you love most
        </p>
        <div className="grid md:grid-cols-2 11xl:grid-cols-4 lg:grid-cols-3 gap-x-5 gap-y-10 pb-[5rem] mx-auto">
          <CatigoryCard
            name={'Create'}
            description={''}
            image={
              'https://icons-for-free.com/iconfiles/png/512/create+cross+new+plus+icon-1320168707626274697.png'
            }
            link={'/createOffer'}
            handleClick={handleClick}
          />
          <CatigoryCard
            name={'Cab Share'}
            description={''}
            image={
              'https://www.netsolutions.com/insights/wp-content/uploads/2019/07/building-a-ride-sharing-app-essential-features-to-include.jpg'
            }
            link={'/cabshare'}
            handleClick={handleClick}
          />
          {categorieslist &&
            categorieslist.map((category, index) => (
              <CatigoryCard
                key={index}
                name={category.name}
                description={category.description}
                image={category.image}
                link={category.link}
                handleClick={handleClick}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
