import React from 'react';
import FooterT2 from '../components/FooterT2';
import NavbarT2 from '../components/NavbarT2';

const about = () => {
  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="w-[90%] mx-auto">
        <NavbarT2 />
        <div className="flex flex-col justify-center gap-10">
          <h1 className="text-center text-[3rem] xl:text-[4rem]  main__font tracking-wider">
            Pica Pool
          </h1>
          <h3 className="text-[1.8rem] md:text-[2.3rem] 14xl:text-[2.3rem] secondary_font font-[600] tracking-wider text-black/70 underline">
            Welcome to pica pool
          </h3>
          <p className="text-[1rem] md:text-[1.1rem] 14xl:text-[1.2rem] secondary_font tracking-wider text-justify my-5 w-[90%]">
            At pica pool, we believe in the power of pooling to unlock
            incredible savings. We are a platform that connects like-minded
            individuals looking for the same product, enabling them to join
            forces and maximize their purchasing power. Our mission is to
            revolutionize the way people shop by providing a collaborative and
            cost-effective solution that benefits everyone involved.
          </p>
          <h3 className="text-[1.8rem] md:text-[2.3rem] 14xl:text-[2.3rem] secondary_font font-[600] tracking-wider text-black/70 underline">
            Our Story
          </h3>
          <div className="">
            <p className="text-[1rem] md:text-[1.1rem] 14xl:text-[1.2rem] secondary_font tracking-wider text-justify my-5 w-[90%]">
              The idea for pica pool was born out of a incident (One day, I
              walked into a pizza store and noticed a tempting offer of "Buy 2,
              Get 1 Free." The price of the pizza was around 360 rupees. It got
              me thinking: If I could find two more people interested in the
              same pizza, we could each get pizza for only 240 rupees instead of
              the original 360 rupees. That's a whopping 33.3% in savings!)
            </p>
            <p className="text-[1rem] md:text-[1.1rem] 14xl:text-[1.2rem] secondary_font tracking-wider text-justify my-5 w-[90%]">
              Inspired by this experience, I realized the immense potential of
              pooling. It's not just limited to pizzas; it applies to every
              domain. We recognized that by bringing people together with
              similar product interests, we could create a community that
              harnesses collective buying power to unlock exclusive discounts
              and savings. Thus, pica pool was founded with the vision of
              empowering individuals to save more and enjoy a better shopping
              experience.
            </p>
          </div>
        </div>
      </div>
      <FooterT2 />
    </div>
  );
};

export default about;
