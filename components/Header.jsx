import React from 'react';
import Carousel from './Carousel';

const Header = () => {
  const imageLinks = {
    'comupter setup':
      'https://static.vecteezy.com/system/resources/previews/010/934/034/non_2x/comfortable-flat-minimalist-workplace-with-desk-computer-pictures-home-work-cozy-interior-scandinavian-style-vector.jpg',
    plant: 'https://hackaday.com/wp-content/uploads/2021/04/wood-pc-800.jpg',
  };
  return (
    <div className="my-[2rem]">
      <div className="flex flex-col lg:flex-row gap-[2rem] lg:gap-[6rem] 14xl:gap-[8rem] justify-center mt-5 items-center w-[90%] 14xl:w-[80%] mx-auto">
        <div className="w-[95%] md:w-[80%] lg:w-[60%] xl:w-[45%] 14xl:w-[50%] flex flex-col gap-5 lg:items-start items-center justify-center lg:mb-auto mx-auto mb-10 md:mb-0">
          <h1 className="text-[1.8rem] md:text-[2.3rem] 14xl:text-[2.3rem] secondary_font font-[600] tracking-wider text-black/70 ">
            Redefining the Art of Saving
          </h1>

          <p className="text-[1rem] md:text-[1.1rem] 14xl:text-[1.2rem] secondary_font tracking-wider text-justify ">
            At <span className="font-[600]">Pica Pool</span>, we believe in the
            power of collaboration for bigger savings. Our platform connects
            people looking for the similar products, allowing them to pool their
            orders and access exclusive discounts. Join our community of smart
            shoppers and discover a new way to save. Start maximizing your
            savings with <span className="font-[600]">Pica Pool</span> today.
          </p>

          <div className="flex flex-row gap-10 mt-5 mr-auto">
            {/* <button className="btn btn- tracking-wider text-[1.1rem] secondary_font font-normal bg-black/90">
              Download
            </button> */}
            <button className="hidden lg:flex btn btn-outline tracking-wider text-[1.1rem] secondary_font font-normal">
              Explore
            </button>
          </div>
        </div>
        <div className="14xl:w-[28rem] 14xl:h-[28rem] w-[20rem] h-[20rem] md:w-[24rem] md:h-[24rem] rounded-md">
          <Carousel imageLinks={imageLinks} />
        </div>
      </div>
    </div>
  );
};

export default Header;
