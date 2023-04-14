import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Icon,
  IconButton
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import Offerdesign1 from '../components/offer/offerdesign1'
import { NextSeo } from "next-seo";

import Filter from "../components/offer/filter";
import OptionMenu from "../components/OptionMenu";
import { useState } from "react";

export default function CategoryOfferDetail({Offerdetail}) {
  const [filter, setfilter] = useState([])
  const tags = ["hii", "hello", "jhxsdsd", "hds", "jksnf", "dsjdns"]
  return (
    <>
    <NextSeo
        title="Offer"
        description="This is the best offer in you Loacation"
      />
      <OptionMenu />
      <Box display={"flex"} borderTop="1px solid grey">
        <Box width={"21%"} boxSizing="border-box" px={"1rem"} overflowY={"scroll"}>
          <Filter filter={filter} setfilter={setfilter}/>
        </Box>
        <Box
          width='78%'
          flexWrap="wrap"
          borderLeft="2px solid #d9d9d9"
        >
          <Box color={"#e45970"} boxSizing="border-box" paddingLeft={'0.5rem'} margin={2}>Home/Clothing</Box>
          <div className="flex flex-row p-3 m-3">
            <div className="my-3 w-[70px]">Tags:</div>
            <div className="flex flex-wrap">
              {tags.map((item, index) => (
                <div className="bg-[#fbea9d] px-[1rem] rounded-full mx-3 my-2 w-fit inline py-1 flex">
                  {item}
                  <button>
                    <CloseIcon marginLeft={2} w={3} h={2} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Offerdesign1 Offerdetail={Offerdetail}/>
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const { category, lat, long } = context.query;
  const res = await fetch(
    `${process.env.DOMAIN_URI}/api/offer/allOffer?category=${category}&lat=${lat}&long=${long}`,
    {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let data = await res.json();
  // console.log(data)
  return {
    props: { Offerdetail: data }, // will be passed to the page component as props
  };
}
