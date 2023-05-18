import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useToast } from '@chakra-ui/react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';

import Login from './login';
import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';

export default function Signup() {
  const toast = useToast();

  const initValues = {
    uname: '',
    password: '',
    email: '',
  };

  const initState = { isLoading: false, error: '', values: initValues };
  const [data, setData] = useState(initState);
  const [touched, setTouched] = useState({});
  const { values, isLoading, error } = data;

  // handlers

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) =>
    setData((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSuccess = async (response) => {
    console.log(response.credential);
    const { data } = await axios.post('/api/auth/google', {
      tokenid: response.credential,
    });
    // console.log(data)
    if (data.token) {
      toast({
        title: 'successfully created',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
    }
  };

  const handleRegister = async () => {
    let registervalue = values
    registervalue['url'] = 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
    const response = await axios.post('/api/auth/', registervalue);
    if (response.data.success == false) {
      console.log('Failer')
      toast({
        title: response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
    }
    else {
      console.log('Success')
      toast({
        title: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
      Router.push('/login');
    }
  }
  return (
    <>
      {/* UI FOR SIGNUP PAGE */}
      <div className="w-screen h-screen bg-[#B9E9FC] secondary_font">
        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
          <div className="w-[30rem] flex flex-col justify-center items-center gap-3">
            <h1 className="text-left  text-[3rem] main__font tracking-wider">
              Pool & Save
            </h1>
            <p className="text-left  text-[1rem] main__font tracking-wider">
              Please fill in the required details to proceed.
            </p>
            <div className="form-control w-[28rem]">
              <label className="label">
                <span className="label-text text-black/60">email*</span>
              </label>
              <input
                value={values.email}
                onChange={handleChange}
                onBlur={onBlur}
                type="email"
                name="email"
                className={`${touched.email && !values.email ? 'bg-red-100' : 'bg-white'
                  } input input-bordered w-[28rem]`}
              />
              {/* FORM VALIDATION */}
              {touched.email && !values.email && (
                <span className="label-text-alt mt-1 text-red-600">
                  Required
                </span>
              )}
            </div>
            <div className="form-control w-[28rem]">
              <label className="label">
                <span className="label-text text-black/60">new username*</span>
              </label>
              <input
                value={values.uname}
                onChange={handleChange}
                onBlur={onBlur}
                type="text"
                name="uname"
                className={`${touched.uname && !values.uname ? 'bg-red-100' : 'bg-white'
                  } input input-bordered w-[28rem]`}
              />
              {/* FORM VALIDATION */}
              {touched.uname && !values.uname && (
                <span className="label-text-alt mt-1 text-red-600">
                  Required
                </span>
              )}
            </div>

            <div className="form-control w-[28rem]">
              <label className="label">
                <span className="label-text text-black/60">new password*</span>
              </label>
              <input
                value={values.password}
                onChange={handleChange}
                onBlur={onBlur}
                type="text"
                name="password"
                className={`${touched.password && !values.password
                    ? 'bg-red-100'
                    : 'bg-white'
                  } input input-bordered w-[28rem]`}
              />
              {/* FORM VALIDATION */}
              {touched.password && !values.password && (
                <span className="label-text-alt mt-1 text-red-600">
                  Required
                </span>
              )}
            </div>

            <button
              disabled={!values.uname || !values.password || !values.email}
              className={`${isLoading ? 'loading' : ''
                }btn btn-active text-[1.1rem] w-[28rem] mt-10 disabled:text-black/50 disabled:bg-black/10`}
              onClick={handleRegister}
            >
              Sign up!
            </button>
            <div className="divider">OR</div>
            <div>
              <GoogleLogin
                onSuccess={onSuccess}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
            {/* WHEN CLICKED REDICT TO SIGN-UP PAGE */}
            <div>
              Already user?{' '}
              <Link className="border-b-2 border-black ml-2" href="/login">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <Flex flexDirection="column" justifyContent="center" alignItems="center">
  <Stack
    flexDir="column"
    mb="2"
    justifyContent="center"
    alignItems="center"
  >
    <Avatar bg="teal.500" />
    <Heading color="teal.400">Welcome</Heading>
    <Box minW={{ base: '90%', md: '468px' }}>
      <form>
        <Stack
          spacing={4}
          p="1rem"
          backgroundColor="whiteAlpha.900"
          boxShadow="md"
        >
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <CFaUserAlt color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Name"
                required
                {...register('name')}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <CFaUserAlt color="gray.300" />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="email address"
                required
                {...register('email')}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <CFaUserAlt color="gray.300" />
              </InputLeftElement>
              <input
                type="file"
                accept="image/jpeg"
                onChange={(event) => {
                  setimageupload(event.target.files[0]);
                }}
              />
              <button onClick={uploadImg}> upload file</button>
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300">
                <CFaUserAlt color="gray.300" />
              </InputLeftElement>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                {...register('password')}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.300">
                <CFaUserAlt color="gray.300" />
              </InputLeftElement>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Conform Password"
                required
                {...register('Cpassword')}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            borderRadius={0}
            type="submit"
            variant="solid"
            colorScheme="teal"
            width="full"
          >
            Signup
          </Button>
        </Stack>
      </form>
    </Box>
  </Stack>
  <Box>
    Already user?{' '}
    <Link color="teal.500" onClick={() => setlogin(true)}>
      Sign in
    </Link>
  </Box>
</Flex> */
}
