import { getCookie } from 'cookies-next';
import React from 'react';
import About from '../components/About';
import CatigoryDisplay from '../components/CatigoryDisplay';
import Header from '../components/Header';

//  bg-cover bg-center main__header
import { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import io from 'socket.io-client';

const ENDPOINT = `https://picapool.com`; //["http://poolandsave.com","http://www.poolandsave.com/"]; //   "https://talk-a-tive.herokuapp.com"; -> After deployment
// const ENDPOINT = `http://localhost:3000`; //["http://poolandsave.com","http://www.poolandsave.com/"]; //   "https://talk-a-tive.herokuapp.com"; -> After deployment
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

  // const saveLocaion = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       let coordinate = [position.coords.latitude, position.coords.longitude];
  //       localStorage.setItem('coordinates', JSON.stringify(coordinate));
  //     },
  //     (err) => console.log(err)
  //   );
  // };

  // useEffect(() => {
  //   // saveLocaion();
  // }, []);

  return (
    <div className="bg-[#B9E9FC]">
      <div className="flex flex-col  items-center justify-center mx-auto"></div>
      <div className="py-20"></div>
      <Header />
      <About />
      <CatigoryDisplay />
    </div>
  );
};

export default Home;
