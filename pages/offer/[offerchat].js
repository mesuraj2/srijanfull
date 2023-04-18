import React from "react";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
// import style from "./../../styles/radar.module.css"
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
import { NextSeo } from "next-seo";
import { Button, useDisclosure, Text } from "@chakra-ui/react";
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
import { getCookie, deleteCookie } from "cookies-next";

export default function Offerchat({ Offerdetail, chatDistance }) {
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
  const [manualDis, setmanualDis] = useState(false);
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
    setmanualDis(false);
    setunderDistance(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`/api/chat/offerchat`, {
      chatName: chatname,
      offerid: router.query.offerchat,
      coordinate: JSON.stringify([17.614, 78.0816]),
    });
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

    handleNext();
  };

  const handlePoolSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`/api/chat/offerchat`, {
      chatName: chatName,
      offerid: router.query.offerchat,
      coordinate: localStorage.getItem("coordinates"),
    });
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
  };
  let value_arr = [3, 5, 10, 20];
  return (
    <>
      <NextSeo
        title={Offerdetail.offername}
        description={Offerdetail.Desc ? Offerdetail.Desc : "It is best offer"}
      />
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
        <section className="text-gray-600 pt-6 w-full md:w-[55%] body-font overflow-hidden">
          <div className="container px-7  pb-2">
            <div className=" flex flex-wrap">
              <img
                alt="ecommerce"
                className="md:w-[85%] m-auto h-[23rem]  object-cover object-center rounded"
                src="https://dummyimage.com/400x400"
              />
              <div className=" w-full pr-6 pl-4 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  BRAND NAME
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  The Catcher in the Rye
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">
                  Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                  sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
                  juiceramps cornhole raw denim forage brooklyn. Everyday carry
                  +1 seitan poutine tumeric. Gastropub blue bottle austin
                  listicle pour-over, neutra jean shorts keytar banjo tattooed
                  umami cardigan.
                </p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                        <option>SM</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    $58.00
                  </span>
                  <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Button
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-gray-600 w-[70%] w-[44%] body-font overflow-hidden">
          <div className="flex items-center p-6 justify-center overflow-hidden">
            <div className="bg-white p-6 rounded-lg shadow-md w-full lg:max-w-xl overflow-hidden">
              {step === 1 && (
                <button
                  className="bg-blue-500 px-6 py-1.5 rounded-lg text-white hover:bg-blue-600"
                  onClick={handleNext}
                >
                  Poolnow
                </button>
              )}
              {step === 2 && (
                <>
                  <h3>Select radius:</h3>
                  <Image
                    src="/img/map.jpg"
                    className="absolute w-[50%] md:w-[30%]"
                  />
                  <div className="wrap relative">
                    <div className="radar-wrap">
                      <div className="radar">
                        <div className="shadow"></div>
                      </div>
                    </div>
                  </div>
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
                  <Button
                    mx="1.5"
                    size={"sm"}
                    borderRadius="full"
                    onClick={() => {
                      setmanualDis(!manualDis);
                    }}
                  >
                    Select Manual
                  </Button>
                  Distance {value}
                  {manualDis ? (
                    <>
                      <SliderInput value={value} setvalue={setvalue} />
                    </>
                  ) : (
                    <></>
                  )}
                  <br />
                  <Button
                    onClick={CheckForChat}
                    backgroundColor={"#dd2d4a"}
                    textColor={"white"}
                  >
                    Pool Now
                  </Button>
                </>
              )}

              {step == 3 && (
                <>
                  {underDistance ? (
                    <Box>
                      {chatDistance.map((chat, index) => {
                        return (
                          <>
                            <Box key={index}>chatName: {chat.chatName} </Box>
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
                  <button
                    className="bg-gray-300 px-6 py-1.5 rounded-lg text-gray-700 hover:bg-gray-400"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
      {/* <Center py={6}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w="85%"
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
        >
          <Flex flexDir={"column"} flex={1}>
            <Image objectFit="cover" boxSize="100%" src={"/img/1.jpeg"} />
            <div>
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
            </div>
          </Flex>

          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Design/> */}
      {/* {pool ? (
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
            )} */}
      {/* </Stack>
        </Stack>
      </Center> */}
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
    props: { Offerdetail: data.fullGroupChat[0], chatDistance: data.data }, // will be passed to the page component as props
  };
}

function SliderInput({ value, setvalue }) {
  // const [value, setValue] = React.useState(0)
  const handleChange = (value) => setvalue(value);

  return (
    <>
      <Heading fontSize={["3xl", "2xl", "3xl"]}>Choose distance(in KM)</Heading>
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

function Design() {
  return <div>hello suraj</div>;
}
