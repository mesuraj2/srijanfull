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

export default function Filter({ filter, setfilter }) {
  return (
    <>
      <div>
        <label>Color</label>
        <div>
          <input type="checkbox" id="topping" name="topping" value="Paneer" />
          red
        </div>
        <div>
          <input type="checkbox" id="topping" name="topping" value="Paneer" />
          black
        </div>
        <div>
          <input type="checkbox" id="topping" name="topping" value="Paneer" />
          green
        </div>
      </div>
    </>
  );
}
