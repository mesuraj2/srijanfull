import React from 'react';
import AllowAccess from '../../components/AllowAccess';
import Footer from '../../components/FooterT2';
import NavbarT2 from '../../components/NavbarT2';

const allowAccess = () => {
  return (
    <div className=" bg-[#B9E9FC]">
      <div className="w-[90%]  mx-auto">
        <NavbarT2 />
        <AllowAccess />
      </div>
      <Footer />
    </div>
  );
};

export default allowAccess;
