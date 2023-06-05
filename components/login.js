import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import secureLocalStorage from 'react-secure-storage';
import { ChatState } from '../Context/ChatProvider';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { GoogleLogin } from '@react-oauth/google';
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
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';

import Signup from './signup';
import axios from 'axios';

export default function Login({ onClose }) {
  // const { register, handleSubmit } = useForm();
  // const [signup, setsignup] = useState(false);
  const { setUser, setsess } = ChatState();
  // const CFaUserAlt = chakra(FaUserAlt);
  // const CFaLock = chakra(FaLock);
  // const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  // const handleShowClick = () => setShowPassword(!showPassword);

  // const loginsubmitForm = async (value) => {
  //   // const {data}=await axios.post("/api/auth/login",{
  //   //   value
  //   // })
  //   const res = await fetch("/api/auth/login", {
  //     method: "POST", // or 'PUT'
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(value),
  //   });
  //   const data = await res.json();
  //   console.log(data);
  //   if (data.success == false) {
  //     toast({
  //       title: "Incorect credientals",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //   } else {
  //     secureLocalStorage.setItem("id", data._id);
  //     localStorage.setItem("user", JSON.stringify(data));
  //     setsess(true);
  //     setUser(data);
  //     onClose();
  //   }
  // };

  const onSuccess = async (response) => {
    console.log(response);
    const { data } = await axios.post('/api/auth/google', {
      tokenid: response.credential,
    });
    secureLocalStorage.setItem('id', data._id);
    localStorage.setItem('user', JSON.stringify(data));
    // setsess(true);
    setUser(data);
    Router.back()
    // onClose();
  };
  const initValues = {
    email: '',
    password: '',
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

  const handleLogin = async () => {
    const response = await axios.post('api/auth/login', values);
    if (response.data.success == false) {
      toast({
        title: response.data.message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    } else {
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      setUser(response.data)
      localStorage.setItem('user',JSON.stringify(response.data))
      onClose();
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="w-screen h-screen bg-[#B9E9FC] secondary_font">
      <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
        <div className="w-screen 5xl:w-[30rem] flex flex-col justify-center items-center gap-3 mx-auto">
          <h1 className="text-center 5xl:text-left text-[2.5rem] 5xl:text-[3rem] main__font tracking-wider">
            Pica Pool
          </h1>
          <p className="text-center 5xl:text-left  text-[.9rem] 5xl:text-[1rem] main__font tracking-wider">
            Please enter your username and password to proceed.
          </p>
          <div className="w-screen 5xl:w-full mx-auto">
            <div className="form-control w-[90%] mx-auto 5xl:w-[28rem]">
              <label className="label">
                <span className="label-text text-black/60">email*</span>
              </label>
              <input
                value={values.email}
                onChange={handleChange}
                onBlur={onBlur}
                type="email"
                name="email"
                className={`${
                  touched.email && !values.email ? 'bg-red-100' : 'bg-white'
                } input input-bordered w-full`}
              />
              {touched.email && !values.email && (
                <span className="label-text-alt mt-1 text-red-600">
                  Required
                </span>
              )}
            </div>
            <div className="form-control w-[90%] mx-auto 5xl:w-[28rem]">
              <label className="label">
                <span className="label-text text-black/60">password*</span>
              </label>
              <input
                value={values.password}
                onChange={handleChange}
                onBlur={onBlur}
                type="password"
                name="password"
                className={`${
                  touched.password && !values.password
                    ? 'bg-red-100'
                    : 'bg-white'
                } input input-bordered w-full`}
              />
              {touched.password && !values.password && (
                <span className="label-text-alt mt-1 text-red-600">
                  Required
                </span>
              )}
            </div>
          </div>
          <button
            disabled={!values.email || !values.password}
            className={`${
              isLoading ? 'loading' : ''
            }btn btn-active text-[1.1rem] w-[60%] 5xl:w-[28rem] mt-10 disabled:text-black/50 disabled:bg-black/10`}
            onClick={handleLogin}
          >
            Login
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
          <div>
            New To Pool & Save?{' '}
            <button
              className="border-b-2 border-black ml-2"
              onClick={() => Router.push('/login?signup=true')}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}