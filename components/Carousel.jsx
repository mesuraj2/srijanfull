import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import styles from '../styles/swiper.module.css';

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

const Carousel = ({ imageLinks, className = '', nav = false }) => {
  if (!nav)
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
                  lazy={true}
                  className={`${className}  rounded-md shadow-xl `}
                  src={imageLinks[itemKey]}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  return (
    <div
      className={`mx-auto w-[18rem] xs:w-[23rem] 5xl:w-[30rem] md:w-[40rem] lg:w-[50rem] lg:h-[30rem] rounded-md`}
    >
      <Swiper
        effect={'creative'}
        loop={true}
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
        // grabCursor={true}
        navigation={true}
        pagination={true}
        modules={[EffectCreative, Navigation, Pagination]}
        className="mySwiper"
      >
        {Object.keys(imageLinks).map((itemKey, index) => {
          return (
            <SwiperSlide
              key={index}
              // className={`${styles['swiper-button-prev']}`}
            >
              <img
                lazy={true}
                className={`mx-auto w-[18rem] xs:w-[23rem] 5xl:w-[30rem] md:w-[40rem] lg:w-full lg:h-full rounded-md   shadow-xl `}
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
