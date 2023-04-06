import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import Offerdesign1 from '../components/offer/offerdesign1'
import { NextSeo } from "next-seo";

import Filter from "../components/offer/filter";
import OptionMenu from "../components/OptionMenu";
import { useState } from "react";

export default function CategoryOfferDetail({Offerdetail}) {
  const [filter, setfilter] = useState([])
  return (
    <>
    <NextSeo
        title="Offer"
        description="This is the best offer in you Loacation"
      />
      <OptionMenu />
      <Box display={"flex"} borderTop="1px solid grey">
        <Box width={"21%"} boxSizing="border-box" px={"1rem"}>
          <Filter filter={filter} setfilter={setfilter}/>
        </Box>
        <Box
          width='78%'
          flexWrap="wrap"
          borderLeft="2px solid #d9d9d9"
        >
          <Box border="0.5px solid #d9d9d9" boxSizing="border-box" paddingLeft={'0.5rem'}>Home/Clothing</Box>
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
