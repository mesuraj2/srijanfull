import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const NavbarT2 = () => {
  const links = {
    HOME: '/',
    ABOUT: '/about',
    CATEGORIES: '/categories',
    FAQs: '/faqs',
    // 'CONTACT US': '/contact',
  };
  const router = useRouter();
  return (
    <div>
      {/* <h1 className="text-center text-[3rem] lg:text-[4rem] 14xl:text-[4rem]  main__font tracking-wider">
        Pica Pool
      </h1> */}
      <div className="navbar bg-transparent">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li tabIndex={0}>
                <a className="justify-between">
                  Parent
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a
            href="/"
            className="btn btn-ghost normal-case text-[1.5rem] main__font tracking-wider font-bold"
          >
            Pool & Save
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex flex-row w-ful justify-center gap-5 xl:gap-10 secondary_font text-[1.2rem] my-[1rem] tracking-wider  w-fit  p-3 mx-auto px-5">
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
        <div className="navbar-end">
          {/* <a className="btn">Get started</a> */}
          <div className="flex items-center justify-center gap-2">
            {/* <button className="btn btn-outline">Your offers</button> */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
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
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
                <div className="w-10 rounded-full ">
                  <img src="https://static.vecteezy.com/system/resources/previews/011/484/608/original/anime-boy-avatar-vector.jpg" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    {/* <span className="badge">New</span> */}
                  </a>
                </li>
                <li>
                  <a>Chat Room</a>
                </li>
                <li>
                  <a>Notifications</a>
                </li>
                <li>
                  <a>Your Cart</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarT2;
