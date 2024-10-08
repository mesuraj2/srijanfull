import React from 'react';
import Carousel from '../components/Carousel';

const data = {
  imgName: 'pizza',
  imgLinks: {
    1: 'https://picapool.nyc3.digitaloceanspaces.com/pizza/image_1.jpg',
    2: 'https://picapool.nyc3.digitaloceanspaces.com/pizza/image_2.jpg',
    3: 'https://picapool.nyc3.digitaloceanspaces.com/pizza/image_3.jpg',
    4: 'https://picapool.nyc3.digitaloceanspaces.com/pizza/image_4.jpg',
    5: 'https://picapool.nyc3.digitaloceanspaces.com/pizza/image_5.jpg',
  },
};

const about = () => {
  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="flex flex-col justify-center items-center gap-10 pt-[2rem] pb-[5rem] mx-auto px-4 md:px-0">
        {/* <h1 className="text-center text-[3rem] xl:text-[4rem]  main__font tracking-wider">
          Pica Pool
        </h1> */}
        <h3 className="text-[1.8rem] md:text-[2.3rem] 14xl:text-[2.3rem] secondary_font font-[600] tracking-wider text-black/70 underline">
          Welcome to pica pool
        </h3>
        <p className="text-[1rem] md:text-[1.1rem] 14xl:text-[1.2rem] secondary_font tracking-wider text-justify my-5 w-full lg:w-[90%]">
          At pica pool, we believe in the power of pooling to unlock incredible
          savings. We are a platform that connects like-minded individuals
          looking for the same product, enabling them to join forces and
          maximize their purchasing power. Our mission is to revolutionize the
          way people shop by providing a collaborative and cost-effective
          solution that benefits everyone involved.
        </p>
        <div className="">
          <Carousel
            nav={true}
            imageLinks={data.imgLinks}
            className={
              'mx-auto w-[18rem] xs:w-[23rem] 5xl:w-[30rem] md:w-[40rem] lg:w-[55rem] lg:h-[30rem] rounded-md'
            }
          />
        </div>
        <h3 className="text-[1.8rem] md:text-[2.3rem] 14xl:text-[2.3rem] secondary_font font-[600] tracking-wider text-black/70 underline">
          Our Story
        </h3>
        <div className="flex flex-col items-center justify-center">
          <p className="text-[1rem] md:text-[1.1rem] 14xl:text-[1.2rem] secondary_font tracking-wider text-justify my-5 w-full lg:w-[90%]">
            The idea for pica pool was born out of a incident (One day, I walked
            into a pizza store and noticed a tempting offer of &quot;Buy 2, Get
            1 Free.&quot; The price of the pizza was around 360 rupees. It got
            me thinking: If I could find two more people interested in the same
            pizza, we could each get pizza for only 240 rupees instead of the
            original 360 rupees. That&apos;s a whopping 33.3% in savings!)
          </p>
          <p className="text-[1rem] md:text-[1.1rem] 14xl:text-[1.2rem] secondary_font tracking-wider text-justify my-5 w-full lg:w-[90%]">
            Inspired by this experience, I realized the immense potential of
            pooling. It&apos;s not just limited to pizzas; it applies to every
            domain. We recognized that by bringing people together with similar
            product interests, we could create a community that harnesses
            collective buying power to unlock exclusive discounts and savings.
            Thus, pica pool was founded with the vision of empowering
            individuals to save more and enjoy a better shopping experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default about;
