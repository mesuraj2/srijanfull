import React from 'react';
import About from '../components/About';
import CatigoryDisplay from '../components/CatigoryDisplay';
import FooterT2 from '../components/FooterT2';
import Header from '../components/Header';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchBar from '../components/SearchBar';
import NavbarT2 from '../components/NavbarT2';
import { getCookie } from 'cookies-next';

//  bg-cover bg-center main__header
import io from 'socket.io-client';
import { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import Notification from '../components/notification';

const ENDPOINT = `http://localhost:3000/`; //["http://poolandsave.com","http://www.poolandsave.com/"]; //   "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket;

const Home = () => {
  // const links = {
  //   HOME: "/",
  //   ABOUT: "/about",
  //   CATEGORIES: "/categories",
  //   FAQs: "/faqs",
  //   "CONTACT US": "/contact",
  // };
  // const router = useRouter();

  useEffect(() => {
    if (getCookie('authtoken')) {
      socket = io(ENDPOINT);
      socket.emit('setup', secureLocalStorage.getItem('id'));
    }
    // eslint-disable-next-line
  }, []);

  const saveLocaion = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let coordinate = [position.coords.latitude, position.coords.longitude];
        localStorage.setItem('coordinates', JSON.stringify(coordinate));
      },
      (err) => console.log(err)
    );
  };

  useEffect(() => {
    saveLocaion();
  }, []);

  return (
    <div className="bg-[#B9E9FC]">
      <div className="flex flex-col  items-center justify-center mx-auto"></div>
      {/* <div className="flex flex-row justify-around items-center">
          <div className="flex flex-row gap-10 invisible">
            <button className"btn  btn-active uppercase tracking-wider text-[1.1rem]">
              LogIn
            </button>
            <button className"btn btn-outline tracking-wider text-[1.1rem]">
              Sign Up
            </button>
          </div>
          <h1 className="text-center text-[3rem] lg:text-[4rem] 14xl:text-[5rem] 2xl:text-[6rem] main__font tracking-wider">
            Pool & Save
          </h1>
          <div className="flex flex-row gap-5 lg:gap-10 ">
            <Link
              href="/login"
              className"btn btn-active uppercase tracking-wider text-[1rem] 14xl:text-[1.1rem] secondary_font font-normal bg-black/90"
            >
              LogIn
            </Link>
            <Link
              href={'/login?signup=true'}
              className"btn btn-outline tracking-wider text-[1rem] 14xl:text-[1.1rem] secondary_font font-normal"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div>
          <ul className="flex flex-row w-ful justify-center gap-10 secondary_font text-[1.2rem] 14xl:text-[1.4rem] my-[1rem] tracking-wider  w-fit  p-3 mx-auto  px-5">
            {Object.keys(links).map((linkKey, index) => (
              <li
                className={`${
                  `${links[linkKey].toLowerCase()}` === router.pathname
                    ? 'border-b-black/80 border-b-4 font-[600] text-black/70 -translate-y-[2px]'
                    : ''
                } cursor-pointer hover:-translate-y-1 transition-all`}
                key={index}
              >
                <Link href={links[linkKey]}>{linkKey}</Link>
              </li>
            ))}
          </ul>
        </div> */}
      <div className="flex items-center justify-center mx-auto mt-10 lg:mb-[8rem] lg:mt-10">
        <SearchBar
          globalClassName={''}
          inputClassName={'w-[100%] md:w-[35rem]'}
        />
      </div>
      <Header />
      <About />
      <div hidden><Notification /></div>
      <CatigoryDisplay />
    </div>
  );
};

export default Home;
