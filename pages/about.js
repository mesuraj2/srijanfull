import React from 'react';
import FooterT2 from '../components/FooterT2';
import NavbarT2 from '../components/NavbarT2';

const about = () => {
  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="w-[90%] mx-auto">
        <NavbarT2 />;
      </div>
      <FooterT2 />
    </div>
  );
};

export default about;
