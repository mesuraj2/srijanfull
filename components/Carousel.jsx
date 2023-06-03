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
import Image from 'next/image';

const Carousel = ({ imageLinks, className = '' }) => {
  return (
    <div className={`${className}`}>
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
            <SwiperSlide key={index}>
              <img
                className={`${className}  rounded-md shadow-xl `}
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
