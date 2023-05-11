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
  IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

import Offerdesign1 from '../components/offer/offerdesign1';
import { NextSeo } from 'next-seo';

import Filter from '../components/offer/filter';
import OptionMenu from '../components/OptionMenu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function CategoryOfferDetail({ Offerdetail }) {
  const [filter, setfilter] = useState([]);
  const [filtercategory, setfiltercategory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // console.log(filter.length);

    if (filter.length == 0) {
      delete router.query.categoryOfferDetail;
      delete router.query.color;
      router.push({
        pathname: '/categoryOfferDetai',
        query: { ...router.query },
      });
    } else {
      const url = filter.join(',');
      delete router.query.categoryOfferDetail;
      router.push({
        pathname: '/categoryOfferDetail',
        query: { ...router.query, color: url },
      });
    }
  }, [filter]);
  useEffect(() => {
    console.log(filtercategory);

    if (filtercategory.length == 0) {
      delete router.query.categoryOfferDetail;
      delete router.query.category;
      router.push({
        pathname: '/categoryOfferDetail',
        query: { ...router.query },
      });
    } else {
      const url = filtercategory.join(',');
      delete router.query.categoryOfferDetail;
      router.push({
        pathname: '/categoryOfferDetail',
        query: { ...router.query, category: url },
      });
    }
  }, [filtercategory]);

  const handlevalue = (value) => {
    let inp = document.getElementById(value);
    inp.checked = false;
    let obj = filter.filter((chck) => chck !== value);
    setfilter(obj);
  };
  const handlevaluecategoy = (value) => {
    let inp = document.getElementById(value);
    inp.checked = false;
    let obj = filter.filter((chck) => chck !== value);
    setfiltercategory(obj);
  };

  const handlePagePrevious = () => {
    if (router.query.page && router.query.page != 1) {
      delete router.query.categoryOfferDetail;
      router.push({
        pathname: '/categoryOfferDetail',
        query: { ...router.query, page: Number(router.query.page) - 1 },
      });
    } else {
      delete router.query.categoryOfferDetail;
      router.push({
        pathname: '/categoryOfferDetail',
        query: { ...router.query, page: 1 },
      });
    }
  };

  const handlePageNext = () => {
    if (router.query.page) {
      delete router.query.categoryOfferDetail;
      router.push({
        pathname: '/categoryOfferDetail',
        query: { ...router.query, page: Number(router.query.page) + 1 },
      });
    } else {
      delete router.query.categoryOfferDetail;
      router.push({
        pathname: '/categoryOfferDetail',
        query: { ...router.query, page: 2 },
      });
    }
  };

  return (
    <>
      <NextSeo
        title="Offer"
        description="This is the best offer in you Loacation"
      />
      <OptionMenu />
      <Box display={'flex'} borderTop="1px solid grey">
        <Box
          width={'21%'}
          boxSizing="border-box"
          px={'1rem'}
          overflowY={'scroll'}
        >
          <Filter
            filter={filter}
            setfilter={setfilter}
            filtercategory={filtercategory}
            setfiltercategory={setfiltercategory}
          />
        </Box>
        <Box width="78%" flexWrap="wrap" borderLeft="2px solid #d9d9d9">
          <div className="flex flex-row px-3 py-1 ">
            <div className="my-3 ">Tags:</div>
            <div className="flex flex-wrap">
              {filter.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="bg-[#fbea9d] px-[1rem] rounded-full mx-3 my-2 w-fit inline py-1 flex"
                  >
                    {value}
                    <button onClick={() => handlevalue(value)}>
                      <CloseIcon marginLeft={2} w={3} h={2} />
                    </button>
                  </div>
                );
              })}

              {filtercategory.map((value, index) => {
                return (
                  <div
                    key={index}
                    className="bg-[#fbea9d] px-[1rem] rounded-full mx-3 my-2 w-fit inline py-1 flex"
                  >
                    {value}
                    <button onClick={() => handlevaluecategoy(value)}>
                      <CloseIcon marginLeft={2} w={3} h={2} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <Offerdesign1 Offerdetail={Offerdetail} />
          <div className="flex justify-between w-[95%] py-3 m-auto">
            <button
              class="bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handlePagePrevious}
            >
              <small> </small> Back
            </button>
            <button
              class="bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handlePageNext}
            >
              Next
            </button>
          </div>
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const { category, lat, long } = context.query;
  delete context.query.categoryOfferDetail;
  const { data } = await axios.get(
    `${process.env.DOMAIN_URI}/api/offer/allOffer`,
    {
      params: context.query,
    }
  );

  return {
    props: { Offerdetail: data }, // will be passed to the page component as props
  };
}
