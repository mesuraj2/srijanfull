import React, { useEffect } from 'react';
import { useState } from 'react';
import Login from '../components/login';
import Signup from '../components/signup';
import { useRouter } from 'next/router';

const login = () => {
  const router =useRouter()
  return (
    <>
    {
       router.query.signup ? <Signup/>: <Login/>
    }
    </>
  );
};

export default login;
