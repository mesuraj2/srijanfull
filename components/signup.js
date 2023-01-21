// import React, { useState,useEffect } from 'react'
// import { useForm } from 'react-hook-form';
// import Router from 'next/router';
// import axios from 'axios';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// import { useToast } from '@chakra-ui/react';
// import {
//   Flex,
//   Heading,
//   Input,
//   Button,
//   InputGroup,
//   Stack,
//   InputLeftElement,
//   chakra,
//   Box,
//   Link,
//   Avatar,
//   FormControl,
//   FormHelperText,
//   InputRightElement
// } from "@chakra-ui/react";
// import { FaUserAlt, FaLock } from "react-icons/fa";



// import Login from './login';

// export default function Signup() {
//   const {register,handleSubmit}=useForm()
//   const [showPassword, setShowPassword] = useState(false);
//   const toast = useToast();
//   const [login, setlogin] = useState(false)
//   const CFaUserAlt = chakra(FaUserAlt);
// const CFaLock = chakra(FaLock);
// const [imageupload, setimageupload] = useState()
// const [imageurl, setimageurl] = useState()


// const uploadImg=async ()=>{

//   const form=new FormData()
//   form.append("pic",imageupload)
//   const {data}=await axios.post("/upload",form)
//   setimageurl(data)
// }

//   const handleShowClick = () => setShowPassword(!showPassword);
//   const submitForm=async (value)=>{
//     value['url']="/img/"+imageurl
//     // console.log(value)
//     if(value.password != value.Cpassword){
//       toast({
//         title: "Password is not maching",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//     else{
//       const res =await fetch('/api/auth', {
//         method: 'POST', 
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body:JSON.stringify(value),
//       })
//       let data=await res.json()
//       console.log(data)
//       if(data.emailExits){
//         toast({
//           title: "Email already exits",
//           status: "warning",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//         });
//       }
//       else{
//         toast({
//           title: "Please check your email, verification has been send to your mail",
//           status: "warning",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//         });
//       }
//     }
//   }
//   useEffect(() => {
//     if(localStorage.getItem('token')!=null){
//       Router.push('/')
//     }
//   }, [])
//   return (
//     <>
     
//       {/* <ToastContainer
//           position="bottom-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//           />
//           {/* Same as */}
//           {/* <ToastContainer />  */}
//       {/* <form onSubmit={handleSubmit(submitForm)}>
//         <input type="text" placeholder='enter your name'  {...register('name',{required:{value:true,message:'name is required'},minLength:{
//           value:8,
//           message:'name must be greater than 8'

//         }})}
//         />
//       <span>{errors?.name?.message}</span>
//         {errors.name && <p>Last name is required.</p>}
//         <input type="email" placeholder='enter your email' {...register('email')}/>
//         <input type="password" placeholder='enter your password' {...register('password')}/>
//         <button>submit</button>
//       </form> */}
//       {/* <form className='flex flex-col items-center items-center' onSubmit={handleSubmit(submitForm)}>
//       <h1 className='text-2xl'>Signup form</h1>
//         <input type="text" className='my-2' placeholder='enter your name' required {...register('name')}/>
//         <input type="email" className='my-2' placeholder='enter your email' required {...register('email',)}/>
//         <input type="password" className='my-2' placeholder='enter your password' required {...register('password')}/>
//         <input type="password" className='my-2' placeholder='enter your conform password' required {...register('Cpassword')}/>
//         <button>submit</button>
//       </form> */}
//     {login? <Login/>:
//       <Flex
//       flexDirection="column"
      
//       justifyContent="center"
//       alignItems="center"
//     >
//       <Stack
//         flexDir="column"
//         mb="2"
//         justifyContent="center"
//         alignItems="center"
//       >
//         <Avatar bg="teal.500" />
//         <Heading color="teal.400">Welcome</Heading>
//         <Box minW={{ base: "90%", md: "468px" }}>
//           <form onSubmit={handleSubmit(submitForm)}>
//             <Stack
//               spacing={4}
//               p="1rem"
//               backgroundColor="whiteAlpha.900"
//               boxShadow="md"
//             >
//               <FormControl>
//                 <InputGroup>
//                   <InputLeftElement
//                     pointerEvents="none"
//                   >
//                     <CFaUserAlt color="gray.300" />
//                     </InputLeftElement>
//                   <Input type="text" placeholder="Name" required {...register('name')}/>
//                 </InputGroup>
//               </FormControl>
//               <FormControl>
//                 <InputGroup>
//                 <InputLeftElement
//                     pointerEvents="none"
//                   >
//                     <CFaUserAlt color="gray.300" />
//                     </InputLeftElement>
//                   <Input type="email" placeholder="email address" required {...register('email')}/>
//                 </InputGroup>
//               </FormControl>
//               <FormControl>
//                 <InputGroup>
//                 <InputLeftElement
//                     pointerEvents="none"
//                   >
//                     <CFaUserAlt color="gray.300" />
//                     </InputLeftElement>
//                   <input type="file"  accept="image/jpeg" onChange={(event)=>{setimageupload(event.target.files[0])}}/>
//                 <button onClick={uploadImg}> upload file</button>
//                 </InputGroup>
//               </FormControl>
//               <FormControl>
//                 <InputGroup>
//                   <InputLeftElement
//                     pointerEvents="none"
//                     color="gray.300"
//                   >
//                     <CFaUserAlt color="gray.300" />
//                     </InputLeftElement>
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     required {...register('password')}
//                   />
//                   <InputRightElement width="4.5rem">
//                     <Button h="1.75rem" size="sm" onClick={handleShowClick}>
//                       {showPassword ? "Hide" : "Show"}
//                     </Button>
//                   </InputRightElement>
//                 </InputGroup>
//               </FormControl>
//               <FormControl>
//                 <InputGroup>
//                   <InputLeftElement
//                     pointerEvents="none"
//                     color="gray.300"
//                   >
//                     <CFaUserAlt color="gray.300" />
//                     </InputLeftElement>
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Conform Password"
//                     required {...register('Cpassword')}
//                   />
//                   <InputRightElement width="4.5rem">
//                     <Button h="1.75rem" size="sm" onClick={handleShowClick}>
//                       {showPassword ? "Hide" : "Show"}
//                     </Button>
//                   </InputRightElement>
//                 </InputGroup>
//               </FormControl>
//               <Button
//                 borderRadius={0}
//                 type="submit"
//                 variant="solid"
//                 colorScheme="teal"
//                 width="full"
//               >
//                 Signup
//               </Button>
//             </Stack>
//           </form>
//         </Box>
//       </Stack>
//       <Box>
//       Already user?{' '}
//         <Link color="teal.500" onClick={()=>setlogin(true)}>
//           Sign in
//         </Link>
//       </Box>
//     </Flex>
// }
//     </>
//   )
// }


import React, { useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';

const Form1 = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        User Registration
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-name" fontWeight={'normal'}>
            First name
          </FormLabel>
          <Input id="first-name" placeholder="First name" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="last-name" fontWeight={'normal'}>
            Last name
          </FormLabel>
          <Input id="last-name" placeholder="First name" />
        </FormControl>
      </Flex>
      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight={'normal'}>
          Email address
        </FormLabel>
        <Input id="email" type="email" />
        <FormHelperText>Well never share your email.</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password" fontWeight={'normal'} mt="2%">
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
};

const Form2 = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        User Details
      </Heading>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
          Country / Region
        </FormLabel>
        <Select
          id="country"
          name="country"
          autoComplete="country"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md">
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </Select>
      </FormControl>

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="street_address"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Street address
        </FormLabel>
        <Input
          type="text"
          name="street_address"
          id="street_address"
          autoComplete="street-address"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          City
        </FormLabel>
        <Input
          type="text"
          name="city"
          id="city"
          autoComplete="city"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="state"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          State / Province
        </FormLabel>
        <Input
          type="text"
          name="state"
          id="state"
          autoComplete="state"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="postal_code"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          ZIP / Postal
        </FormLabel>
        <Input
          type="text"
          name="postal_code"
          id="postal_code"
          autoComplete="postal-code"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>
    </>
  );
};

const Form3 = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Social Handles
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}>
            Website
          </FormLabel>
          <InputGroup size="sm">
            <InputLeftAddon
              bg="gray.50"
              _dark={{
                bg: 'gray.800',
              }}
              color="gray.500"
              rounded="md">
              http://
            </InputLeftAddon>
            <Input
              type="tel"
              placeholder="www.example.com"
              focusBorderColor="brand.400"
              rounded="md"
            />
          </InputGroup>
        </FormControl>

        <FormControl id="email" mt={1}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}>
            About
          </FormLabel>
          <Textarea
            placeholder="you@example.com"
            rows={3}
            shadow="sm"
            focusBorderColor="brand.400"
            fontSize={{
              sm: 'sm',
            }}
          />
          <FormHelperText>
            Brief description for your profile. URLs are hyperlinked.
          </FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

export default function Multistep() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form">
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated></Progress>
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%">
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="teal"
                variant="outline">
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                }}>
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}

