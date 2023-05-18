import React from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import Filter from './offer/filter';

const FilterDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="block lg:hidden">
        <button className="btn flex items-center gap-2" onClick={onOpen}>
          Filters <FaFilter />
        </button>
        <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody>
              <Filter />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="w-[20rem] rounded-md bg-white p-5 lg:block hidden mt-10">
        <Filter />
      </div>
    </>
  );
};

export default FilterDrawer;
