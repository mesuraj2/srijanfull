import React from "react";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import {
  Button,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import secureLocalStorage from "react-secure-storage";
import { ChatState } from "../../Context/ChatProvider";
import {
  Badge,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import Auth from "../../components/auth";
import haversine from "haversine-distance";

export default function Offerchat({ Offerdetail, chatDistance }) {
  // console.log(chatDistance[0].Distance)
  const [firstChat, setfirstChat] = useState();
  const [currentLocation, setcurrentLocation] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [chatid, setchatid] = useState();
  const toast = useToast();
  const [chatname, setchatname] = useState();
  const [coord, setcoord] = useState([]);
  const { setSelectedChat } = ChatState();
  const [token, settoken] = useState(false);

  const [pool, setpool] = useState(false);
  const [pool2, setpool2] = useState(true);
  const [value, setvalue] = useState(5);
  const [chatName, setchatName] = useState();
  const [chatDetail, setchatDetail] = useState();
  const [underDistance, setunderDistance] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      `/api/chat/offerchat`,
      {
        chatName: chatname,
        offerid: router.query.offerchat,
        coordinate: JSON.stringify([17.614, 78.0816]),
      },
    );
    // console.log(data)
    toast({
      title: "successfull created",
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
      body: JSON.stringify({ ChatId: data._id }),
    });
    let data2 = await res2.json();
    setSelectedChat(data2);
    router.push({ pathname: "/chat" });
    setchatname("");
  };

  const CheckForChat = async () => {
    setpool2(false);
    if (chatDistance[0]) {
      if (value < chatDistance[0].Distance + 2) {
        setunderDistance(true);
      }
    }
  };

  const handlePoolSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      `/api/chat/offerchat`,
      {
        chatName: chatName,
        offerid: router.query.offerchat,
        coordinate: localStorage.getItem("coordinates"),
      },
    );
    toast({
      title: "successfull created",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    const res2 = await fetch(`/api/chat/fetchgroupChat`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ChatId: data._id }),
    });
    let data2 = await res2.json();
    // console.log(data2)
    setSelectedChat(data2);
    router.push({ pathname: "/chat" });
    setchatname("");
  };

  const JoinChat = async (id) => {
    if (!secureLocalStorage.getItem("token")) {
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
  };
  return (
    <>
    <NextSeo
        title={Offerdetail.offername}
        description={Offerdetail.Desc ? Offerdetail.Desc : "It is best offer"}
      />
      {/* <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            Form
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="enter your chat Name"
                value={chatname}
                onChange={(e) => setchatname(e.target.value)}
              />
              <button onClick={onClose}>submit</button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
      <Center py={6}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w="77%"
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
        >
          <Flex flex={1} bg="blue.200">
            <Image objectFit="cover" boxSize="100%" src={"/img/1.jpeg"} />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {Offerdetail.offername}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              {Offerdetail.Category && Offerdetail.Category}
            </Text>
            <Text
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
            >
              Description:-- {Offerdetail.Desc && Offerdetail.Desc}
            </Text>
            {firstChat && (
              <div>{haversine(currentLocation, firstChat) / 1000}</div>
            )}
            {pool ? (
              <>
                {pool2 ? (
                  <>
                    {" "}
                    <label>Choose a distance</label>
                    <SliderInput value={value} setvalue={setvalue} />
                    <button onClick={CheckForChat}>Pool Now</button>
                  </>
                ) : underDistance ? (
                  <Box>
                    {chatDistance.map((chat) => {
                      return (
                        <>
                          <Box>chatName: {chat.chatName} </Box>
                          <p>{chat.Distance.toFixed(2)}</p>
                          <Button onClick={() => JoinChat(chat._id)}>
                            Join Now
                          </Button>
                        </>
                      );
                    })}
                  </Box>
                ) : (
                  <form onSubmit={handlePoolSubmit}>
                    <SliderInput value={value} setvalue={setvalue} />
                    <Input
                      type="text"
                      placeholder="Enter chat name"
                      value={chatName}
                      onChange={(e) => setchatName(e.target.value)}
                      required
                    />
                    <Input
                      type="text"
                      placeholder="Enter the description"
                      value={chatDetail}
                      onChange={(e) => setchatDetail(e.target.value)}
                      required
                    />
                    <button type="submit">Pool Now</button>
                  </form>
                )}
              </>
            ) : (
              <Button color={"blue.300"} onClick={() => setpool(true)}>
                Pool Now
              </Button>
            )}
          </Stack>
        </Stack>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `${process.env.DOMAIN_URI}/api/offer/offerdetail?lat=${context.query.lat}&long=${context.query.long}`,
    {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: context.query.offerchat }),
    }
  );
  let data = await res.json();
  data.data = JSON.parse(data.data);
  return {
    props: { Offerdetail: data.fullGroupChat, chatDistance: data.data }, // will be passed to the page component as props
  };
}

function SliderInput({ value, setvalue }) {
  // const [value, setValue] = React.useState(0)
  const handleChange = (value) => setvalue(value);

  return (
    <>
      <Heading>Choose distance(in KM)</Heading>
      <Box display={"flex"} width="80%">
        <NumberInput
          maxW="100px"
          mr="2rem"
          value={value}
          onChange={handleChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Slider
          focusThumbOnChange={false}
          value={value}
          onChange={handleChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb fontSize="sm" boxSize="32px">
            {value}
          </SliderThumb>
        </Slider>
      </Box>
    </>
  );
}
