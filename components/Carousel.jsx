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

const Carousel = ({ imageLinks }) => {
  return (
    <div>
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
        {Object.keys(imageLinks).map((itemKey, index) => {
          return (
            <SwiperSlide>
              <img
                className="14xl:w-[28rem] 14xl:h-[28rem] w-[20rem] h-[20rem] md:w-[24rem] md:h-[24rem] rounded-md shadow-xl"
                src={imageLinks[itemKey]}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
