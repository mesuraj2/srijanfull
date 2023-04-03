import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";

export default function Offerdesign1({ Offerdetail }) {
  const { city, latitude, longitude, setlatitude, setlongitude, setcity } =
  ChatState();
  // console.log(Offerdetail)
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-6 py-16 mx-auto">
        <div className="flex flex-wrap -m-4">
          {Offerdetail.map((offer, index) => {
            return (
              <div
                key={offer._id}
                className="lg:w-1/4 customBreak md:w-1/2 p-4 w-full hover:shadow-md"
              >
                <div className="bg-[#DD2D4A] text-white rounded-t-lg leading-7">Offer</div>
                <a className="block relative h-72 rounded-b-lg overflow-hidden">
                  <Image
                    src="/img/1.jpeg"
                    layout={"fill"}
                    alt="image"
                    className="image_border"
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {offer.Category}
                  </h3>
                  <Link href={`/offer/${offer._id}?category=${offer.Category}&lat=${latitude}&long=${longitude}`}>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {offer.offername}
                    </h2>
                  </Link>
                  <p className="mt-1">{offer.Desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
