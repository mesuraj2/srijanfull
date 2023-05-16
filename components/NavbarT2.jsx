import { useRouter } from 'next/router';
import React from 'react';

const NavbarT2 = () => {
  const links = ['HOME', 'ABOUT', 'OFFERS', 'CATEGORIES', 'FAQs', 'CONTACT US'];
  const router = useRouter();
  return (
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
        <a className="btn btn-ghost normal-case text-[1.5rem] main__font tracking-wider font-bold">
          Pool & Save
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex flex-row w-ful justify-center gap-10 secondary_font text-[1.2rem] my-[1rem] tracking-wider  w-fit  p-3 mx-auto  px-5">
          {links.map((link, index) => (
            <li
              className={`${
                `/${link.toLowerCase()}` === router.pathname
                  ? 'border-b-black/80 border-b-4 font-[600] text-black/70 -translate-y-[2px]'
                  : ''
              } cursor-pointer hover:-translate-y-1 transition-all`}
              key={link}
            >
              {link}
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Get started</a>
      </div>
    </div>
  );
};

export default NavbarT2;