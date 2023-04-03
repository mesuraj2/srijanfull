import { Box, Heading, HStack, Stack } from "@chakra-ui/layout";
import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";

function MyAccordion({ filter, setfilter, Category,options}) {
  return (
    <>
      <Heading>{Category}</Heading>
      <RadioGroup defaultValue={options[0]}>
        <Stack spacing={2} direction="column">
          {options.map((value,index) => {
            return <Radio key={index} value={value}>{value}</Radio>;
          })}
        </Stack>
      </RadioGroup>
    </>
  );
}

export default function Filter({ filter, setfilter }) {
  const options = ["Cloth", "Book", "Phone"];
  return (
    <>
      <Heading fontWeight={"400"} fontSize={"2rem"}>
        Filter
      </Heading>
      <MyAccordion filter={filter} setfilter={setfilter}  Category={"Category"} options={options}/>
    </>
  );
}
