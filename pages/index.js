import React from 'react';
import About from '../components/About';
import CatigoryDisplay from '../components/CatigoryDisplay';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Link from 'next/link';
import { useRouter } from 'next/router';

//  bg-cover bg-center main__header

const home = () => {
  const links = {
    HOME: '/',
    ABOUT: '/about',
    CATEGORIES: '/categories',
    FAQs: '/faqs',
    'CONTACT US': '/contact',
  };
  const router = useRouter();
  return (
    <div className="bg-[#B9E9FC]">
      <div className="flex flex-col">
        <div className="flex flex-row justify-around items-center">
          <div className="flex flex-row gap-10 invisible">
            <button class="btn  btn-active uppercase tracking-wider text-[1.1rem]">
              LogIn
            </button>
            <button class="btn btn-outline tracking-wider text-[1.1rem]">
              Sign Up
            </button>
          </div>
          <h1 className="text-center  text-[6rem] main__font tracking-wider">
            Pool & Save
          </h1>
          <div className="flex flex-row gap-10 ">
            <Link
              href="/login"
              class="btn btn-active uppercase tracking-wider text-[1.1rem] secondary_font font-normal bg-black/90"
            >
              LogIn
            </Link>
            <Link
              href={'/login?signup=true'}
              class="btn btn-outline tracking-wider text-[1.1rem] secondary_font font-normal"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div>
          <ul className="flex flex-row w-ful justify-center gap-10 secondary_font text-[1.4rem] my-[1rem] tracking-wider  w-fit  p-3 mx-auto  px-5">
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
        </div>
        <Header />
        <About />
        <CatigoryDisplay />
        <Footer />
      </div>
    </div>
  );
};

export default home;
