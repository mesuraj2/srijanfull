import Image from "next/image";
import React from "react";

export default function Offerdesign1() {
  return (
    <section className="text-gray-600 body-font md:w-[85%] m-auto">
      <div className="container px-5 py-16 mx-auto">
        <div className="flex flex-wrap -m-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((value, index) => {
            return (
              <div
                key={index}
                className="lg:w-1/3 customBreak md:w-1/2 p-4 w-full hover:shadow-lg"
              >
                <a className="block relative h-48 rounded overflow-hidden">
                  <Image
                    src="/img/1.jpeg"
                    layout={"fill"}
                    alt="image"
                    className="image_border"
                  />
                </a>
                <div className="mt-4 flex justify-between px-5">
                  <div className="font-semibold">Cloth</div>
                  <div className="text-[#DD2D4A] font-bold">
                    Up to 10% off
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
