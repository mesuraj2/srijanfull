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
import { useState,useEffect } from 'react';
import  secureLocalStorage  from  "react-secure-storage";
import Login from "./login";
import { motion } from "framer-motion";

const modalLivePool = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
//   const [user, setuser] = useState([])
//   useEffect(() => {
//     if(secureLocalStorage.getItem('user')){
//      setuser(JSON.parse(secureLocalStorage.getItem('user')))
//     }
//    }, [])

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <Button bg={'#DD2D4A'} as={motion.button} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}} color='white' borderRadius='5px' onClick={onOpen}>Live Pool</Button>
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
