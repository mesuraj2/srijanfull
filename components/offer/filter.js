import { Box, Heading, Divider, HStack, Stack } from "@chakra-ui/layout";
import React, { useState }  from "react";
import { Select, CheckboxGroup, Checkbox, Menu, MenuButton, MenuList, Button, Icon, useDisclosure } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";


import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";

function MyAccordion({ filter, setfilter, Category,options}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="my-5">
        
          <Heading size={"md"} margintop={5}   marginBottom={3} textAlign="left" fontWeight={"600"}>{Category}</Heading>
          <CheckboxGroup defaultValue={options[0]}>
            <Stack spacing={2} direction="column">
              {options.map((value, index) => {
                return <Checkbox colorScheme="red" key={index} value={value}>{value}</Checkbox>;
              })}
            </Stack>
          </CheckboxGroup>
          <br />
          <hr />
    </div>
  );
}

export default function Filter({ filter, setfilter }) {
  const options = ["Cloth", "Book", "Phone"];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };
  return (
    <>
      <Heading fontWeight={"400"} fontSize={"2rem"} padding={2}>
        Filter
      </Heading>
      <Divider/>
      <MyAccordion filter={filter} setfilter={setfilter}  Category={"Category"} options={options}/>

      <MyAccordion filter={filter} setfilter={setfilter} Category={"Category"} options={options} />

      <MyAccordion filter={filter} setfilter={setfilter} Category={"Category"} options={options} />

      <MyAccordion filter={filter} setfilter={setfilter} Category={"Category"} options={options} />

      <MyAccordion filter={filter} setfilter={setfilter} Category={"Category"} options={options} />


      


    </>
  );
}
