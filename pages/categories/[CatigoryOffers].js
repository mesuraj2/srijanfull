import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../components/Footer';
import NavbarT2 from '../../components/NavbarT2';
import { FaFilter } from 'react-icons/fa';
import SearchBar from '../../components/SearchBar';

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
                  return (
                    <div className="card card-side bg-base-100 shadow-xl w-[28rem] h-[15rem]">
                      <figure>
                        <img
                          src="https://assets.tatacliq.com/medias/sys_master/images/31135470419998.jpg"
                          alt="Movie"
                          className="w-[14rem] h-[14rem] bg-center"
                        />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">Puma Sneakers</h2>
                        <p>save 20% on purchase of 2 sneakers</p>
                        <div className="card-actions justify-end">
                          <button className="btn ">Join Chat</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
            <ul className="menu p-4 mt-4 w-[22rem] bg-base-100 text-base-content  rounded-md ">
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default index;
