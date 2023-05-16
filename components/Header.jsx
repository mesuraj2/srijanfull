import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-creative';

// import required modules
import {
  EffectFlip,
  EffectCards,
  Pagination,
  Navigation,
  EffectCreative,
} from 'swiper';

const Header = () => {
  return (
    <div className="my-[2rem]">
      <div className="flex flex-col lg:flex-row gap-[2rem] lg:gap-[6rem] 14xl:gap-[8rem] justify-center mt-5 items-center w-[90%] 14xl:w-[80%] mx-auto">
        <div className="w-[95%] md:w-[80%] lg:w-[60%] xl:w-[45%] 14xl:w-[40%] flex flex-col gap-5 lg:items-start items-center justify-center lg:mb-auto mx-auto mb-10 md:mb-0">
          <h1 className="text-[1.8rem] md:text-[2.3rem] 14xl:text-[2.5rem] secondary_font font-[600] tracking-wider text-black/70 ">
            This Is The Heading
          </h1>

          <p className="text-[1rem] md:text-[1.1rem] 14xl:text-[1.2rem] secondary_font tracking-wider text-justify ">
            Lorem ipsum dolor sitamet consectetur, adipisicing Architecto
            deserunt, laborum atque consequatur quos iste incidunt possimus a et
            quaerat fuga aperiam sed quidem dolores illum odio.
          </p>

          <div className="flex flex-row gap-10 mt-5 ">
            <button className="btn btn- tracking-wider text-[1.1rem] secondary_font font-normal bg-black/90">
              Download
            </button>
            <button className="btn btn-outline tracking-wider text-[1.1rem] secondary_font font-normal">
              Explore
            </button>
          </div>
        </div>
        <div className="14xl:w-[28rem] 14xl:h-[28rem] w-[20rem] h-[20rem] md:w-[24rem] md:h-[24rem] rounded-md">
          <Swiper
            effect={'creative'}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ['-120%', 0, -500],
              },
              next: {
                shadow: true,
                translate: ['120%', 0, -500],
              },
            }}
            grabCursor={true}
            modules={[EffectCreative, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                className="14xl:w-[28rem] 14xl:h-[28rem] w-[20rem] h-[20rem] md:w-[24rem] md:h-[24rem] rounded-md shadow-xl"
                src="https://img.freepik.com/premium-vector/set-minimalist-fast-food-design_342803-6.jpg?w=2000"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="14xl:w-[28rem] 14xl:h-[28rem] w-[20rem] h-[20rem] md:w-[24rem] md:h-[24rem] rounded-md shadow-xl"
                src="https://img.freepik.com/premium-vector/set-cartoon-fast-food-illustratio_530597-17.jpg?w=2000"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="14xl:w-[28rem] 14xl:h-[28rem] w-[20rem] h-[20rem] md:w-[24rem] md:h-[24rem] rounded-md shadow-xl"
                src="https://img.freepik.com/premium-vector/set-cute-fast-food-with-colored-hand-draw-style_7130-1870.jpg?w=2000"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="14xl:w-[28rem] 14xl:h-[28rem] w-[20rem] h-[20rem] md:w-[24rem] md:h-[24rem] rounded-md shadow-xl"
                src="https://img.freepik.com/free-vector/delicious-fast-food-pop-art-style_24908-61615.jpg"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Header;
