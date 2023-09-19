import React, { useState } from "react";
import Carousel from "./Carousel";

const About = () => {
  const [tabSelected, setTabSelected] = useState("Clothing");
  return (
    <div className="w-[80vw] mx-auto bg-white py-10">
      <h3 className="text-[1.8rem] md:text-[2.3rem] 14xl:text-[2.3rem] secondary_font font-[600] tracking-wider text-black/70 underline text-center">
        Our Story
      </h3>
      <div className="flex flex-col items-center justify-center">
        <p className="text-[1rem] md:text-[1.1rem] 14xl:text-[1.2rem] secondary_font tracking-wider text-justify my-5 w-full lg:w-[90%]">
          The inception of Pica Pool was sparked by a simple yet profound
          observation. Upon entering a pizzeria one day, a promotional offer
          caught our attention: &quot;Buy 2, Get 1 Free.&quot; With the pizza
          priced at 360 rupees, it became evident that if three individuals
          collaborated on the purchase, each could relish their slice for just
          240 rupees – reflecting a remarkable savings of 33.3%.
        </p>
        <p className="text-[1rem] md:text-[1.1rem] 14xl:text-[1.2rem] secondary_font tracking-wider text-justify my-5 w-full lg:w-[90%]">
          This experience illuminated the vast potential of collaborative
          consumption. The principle, while illustrated by pizza, is universal,
          transcending varied products and services. At Pica Pool, we identified
          an opportunity: by converging individuals with aligned purchasing
          interests, we could amalgamate their collective buying strength. This
          synergy would not only unveil unique discounts but also elevate the
          overall shopping journey.
        </p>
        <p className="text-[1rem] md:text-[1.1rem] 14xl:text-[1.2rem] secondary_font tracking-wider text-justify my-5 w-full lg:w-[90%]">
          Thus, Pica Pool was conceived, grounded in a commitment to empower
          consumers. Through our platform, we aim to redefine shopping, ensuring
          our community enjoys both superior value and an enhanced experience.
        </p>
      </div>
    </div>
  );
};

export default About;
