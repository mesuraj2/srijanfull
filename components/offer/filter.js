import { Box, Heading, Divider, HStack, Stack } from '@chakra-ui/layout';
import React, { useState } from 'react';
import {
  Select,
  CheckboxGroup,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  Button,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { Radio, RadioGroup } from '@chakra-ui/react';

function MyAccordion({ filter, setfilter, Category, options }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="my-5">
      <Heading
        size={'md'}
        margintop={5}
        marginBottom={3}
        textAlign="left"
        fontWeight={'600'}
      >
        {Category}
      </Heading>
      <CheckboxGroup defaultValue={options[0]}>
        <Stack spacing={2} direction="column">
          {options.map((value, index) => {
            return (
              <Checkbox colorScheme="red" key={index} value={value}>
                {value}
              </Checkbox>
            );
          })}
        </Stack>
      </CheckboxGroup>
      <br />
      <hr />
    </div>
  );
}

export default function Filter({ filter, setfilter, setfiltercategory }) {
  const color = ['red', 'black', 'green'];
  const category = ['book', 'cloth'];
  // const [checke, setChecke] = useState([]);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setfilter((pre) => [...pre, value]);
    } else {
      setfilter((pre) => {
        return [...pre.filter((color) => color !== value)];
      });
    }
  };

  const handleChangeCategory = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setfiltercategory((pre) => [...pre, value]);
    } else {
      setfiltercategory((pre) => {
        return [...pre.filter((color) => color !== value)];
      });
    }
  };

  const distances = ['200 m', '500 m', '1 km', '2 km', '5 km'];
  return (
    <>
      {/* <Heading fontWeight={'500'} fontSize={'2rem'}>
        Filter
      </Heading>
      <Divider />
      <div className="py-3">
        <Heading size={'md'} margintop={5} textAlign="left" fontWeight={'600'}>
          Color
        </Heading>
        {color.map((color, index) => {
          return (
            <div key={index} className="flex">
              <input
                type="checkbox"
                id={color}
                value={color}
                onChange={handleChange}
              />
              <p className="mx-1">{color}</p>
            </div>
          );
        })}
      </div>
      <Divider />
      <div className="py-1">
        <Heading size={'md'} margintop={5} textAlign="left" fontWeight={'600'}>
          category
        </Heading>
        {category.map((category, index) => {
          return (
            <div key={index} className="flex">
              <input
                type="checkbox"
                id={category}
                value={category}
                onChange={handleChangeCategory}
              />
              <p className="mx-1">{category}</p>
            </div>
          );
        })}
      </div> */}

      {/* <MyAccordion
        filter={filter}
        setfilter={setfilter}
        Category={"Category"}
        options={options}
      /> */}

      {/* <MyAccordion
        filter={filter}
        setfilter={setfilter}
        Category={"Category"}
        options={options}
      />

      <MyAccordion
        filter={filter}
        setfilter={setfilter}
        Category={"Category"}
        options={options}
      />

      <MyAccordion
        filter={filter}
        setfilter={setfilter}
        Category={"Category"}
        options={options}
      /> */}
      <div className="flex flex-col gap-1 secondary_font tracking-wider">
        <p className="text-[1.1rem] font-[500] my-3">Radius Under</p>
        {distances.map((dis, index) => {
          return (
            <div className="flex ml-3 mt-1">
              <input type="checkbox" className="checkbox" id={`${dis}`} />
              <label htmlFor={dis} className="mx-1 text-[1.1rem]">
                {dis}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}
