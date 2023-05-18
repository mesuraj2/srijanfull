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
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import Login from "./login";
import { motion } from "framer-motion";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { ChatState } from "../Context/ChatProvider";
import { useRouter } from "next/router";


const modalLivePool = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setstep] = useState(1);
  let value_arr = [3, 5, 10, 20];
  const [value, setvalue] = useState(2);
  const [categor, setcategor] = useState("book");
  let category = ["book", "cloth"];
  const [data2, setdata] = useState([]);
  const toast = useToast()
  const { setSelectedChat } = ChatState();
  const router=useRouter()

  const handlePool = async () => {
    let coordinate = localStorage.getItem("coordinates");
    const { data } = await axios.post("/api/offer/topChatnearYou", {
      coordinate,
      distance: value,
    });
    console.log(data[1].offerid.offername);
    setdata(data);
    setstep(2);
  };

  const handleJoin=async(id)=>{
    if (getCookie("authtoken") == null && getCookie("authtoken") == undefined) {
      // router.push("/Login")
      settoken(true);
    } else {
      const res = await fetch(`/api/chat/groupaddOffer`, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: secureLocalStorage.getItem("id"),
          chatId: id,
        }),
      });
      let data = await res.json();
      if (data.exits) {
        toast({
          title: "User already exits",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        const res2 = await fetch(`/api/chat/fetchgroupChat`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ChatId: id }),
        });
        let data2 = await res2.json();
        // console.log(data2)
        setSelectedChat(data2);
        router.push({ pathname: "/chat" });
      } else {
        toast({
          title: "successfull added",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        const res2 = await fetch(`/api/chat/fetchgroupChat`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ChatId: id }),
        });
        let data2 = await res2.json();
        // console.log(data2)
        setSelectedChat(data2);
        router.push({ pathname: "/chat" });
      }
    }
  }

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <Button
          bg={"#DD2D4A"}
          as={motion.button}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          color="white"
          borderRadius="5px"
          onClick={onOpen}
        >
          Live Pool
        </Button>
      )}
      <Modal
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        backdropBlur
      >
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            {step == 1 && (
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
                categories: {categor} : {value}
                <button onClick={handlePool}>See live Pool</button>
              </div>
            )}

            {step == 2 &&
              data2.map((value, index) => (
                <div key={index} className="bg-slate-400 m-1">
                  <button onClick={() => setstep(1)}>back</button>
                  <div>{value.offerid ? value.offerid.offername: "null" }</div>
                  <div>{value.offerid ? value.offerid.description: "null" }</div>
                  <button onClick={()=>handleJoin(value._id)}>Join Chat</button>
                </div>

              ))}
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
