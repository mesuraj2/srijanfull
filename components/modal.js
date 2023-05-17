import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import secureLocalStorage from "react-secure-storage";
import Login from "./login";
import { motion } from "framer-motion";

const modalLivePool = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setstep] = useState(1)
  let value_arr = [3, 5, 10, 20];
  const [value, setvalue] = useState(2);
  const [categor, setcategor] = useState('book')
  let category = ['book', 'cloth']


  const handlePool = async () => {

    setstep(2)
  }

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <Button bg={'#DD2D4A'} as={motion.button} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} color='white' borderRadius='5px' onClick={onOpen}>Live Pool</Button>
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered backdropBlur >
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            {
              step == 1 &&
              <div>
                <div>
                  {value_arr.map((item, index) => (
                    <Button
                      key={index}
                      border={"1px solid black"}
                      mx="1.5"
                      borderRadius="full"
                      className="rounded"
                      size={"xs"}
                      onClick={() => {
                        setvalue(item);
                      }}
                    >
                      {item} Km
                    </Button>
                  ))}
                </div>
                <div>
                  {category.map((item, index) => (
                    <Button
                      key={index}
                      border={"1px solid black"}
                      mx="1.5"
                      borderRadius="full"
                      className="rounded"
                      size={"xs"}
                      onClick={() => {
                        setcategor(item);
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
                <button onClick={handlePool}>See live Pool</button>
              </div>
            }

          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default modalLivePool;
