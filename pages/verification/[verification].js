import React, { useEffect, useState } from 'react';
import Footer from '../../components/FooterT2';
import NavbarT2 from '../../components/NavbarT2';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';

const Verification = () => {
  const initValues = {
    one: '',
    two: '',
    three: '',
    four: '',
  };
  const router = useRouter();
  const toast = useToast();
  const [otp, setotp] = useState('');
  const initState = { isLoading: false, error: '', values: initValues };
  const [data, setData] = useState(initState);
  const [touched, setTouched] = useState({});
  const { values, isLoading, error } = data;

  useEffect(() => {
    if (values.one || values.two || values.three || values.four) {
      setotp(values.one + values.two + values.three + values.four);
    }
  }, [initValues]);
  // handlers
  useEffect(() => {
    if (document.getElementsByName('one').length > 0) {
      document.getElementsByName('one')[0].focus();
    }
  }, []);
  const handleVerify = async () => {
    const response = await axios.post('/api/auth/verifyOtp', {
      userId: router.query.verification,
      otp: otp,
    });
    console.log(response.data);
    if (response.data.success) {
      toast({
        title: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
      router.push('/login');
    } else {
      toast({
        title: response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
    }

    console.log(otp);
  };

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) => {
    const value = target.value.slice(0, 1); // Get the first character of the input value

    if (!isNaN(value)) {
      // Check if the value is a number
      if (target.parentNode.nextSibling != null) {
        target.parentNode.nextSibling.firstChild.focus();
      }
      return setData((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          [target.name]: value,
        },
      }));
    }
  };

  return (
    <div className="w-screen h-screen bg-[#B9E9FC] secondary_font">
      <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
        <div className="w-[15rem] xs:w-fit  flex flex-col justify-center items-center gap-3 mx-auto">
          <h1 className="text-center 5xl:text-left text-[2.5rem] 5xl:text-[3rem] main__font tracking-wider">
            Pica Pool
          </h1>
          <p className="text-center 5xl:text-left  text-[.9rem] 5xl:text-[1rem] main__font tracking-wider">
            Please enter your OTP.
          </p>
          <div className="text-gray-500 flex flex-row gap-2 items-center justify-center text-[.9rem] 5xl:text-[1rem]">
            <p>expires in </p>
            <span className="countdown font-mono text-[1.1rem] mt-1">
              <span style={{ '--value': 5 }}></span>:
              <span style={{ '--value': 0 }}></span>
            </span>
          </div>
          <div className="w-[10rem] mx-auto flex flex-row items-center justify-center gap-2">
            <div className="form-control w-[2rem] mx-auto ">
              <input
                value={values.one}
                onChange={handleChange}
                onBlur={onBlur}
                type="number"
                name="one"
                className={`${
                  touched.one && !values.one ? 'bg-red-100' : 'bg-white'
                } input input-bordered  p-2`}
              />
            </div>
            <div className="form-control w-[2rem] mx-auto ">
              <input
                value={values.two}
                onChange={handleChange}
                onBlur={onBlur}
                type="number"
                name="two"
                className={`${
                  touched.two && !values.two ? 'bg-red-100' : 'bg-white'
                } input input-bordered  p-2`}
              />
            </div>
            <div className="form-control w-[2rem] mx-auto ">
              <input
                value={values.three}
                onChange={handleChange}
                onBlur={onBlur}
                type="number"
                name="three"
                className={`${
                  touched.three && !values.three ? 'bg-red-100' : 'bg-white'
                } input input-bordered  p-2`}
              />
            </div>
            <div className="form-control w-[2rem] mx-auto ">
              <input
                value={values.four}
                onChange={handleChange}
                onBlur={onBlur}
                type="number"
                name="four"
                className={`${
                  touched.four && !values.four ? 'bg-red-100' : 'bg-white'
                } input input-bordered  p-2`}
              />
            </div>
          </div>
          <button
            disabled={
              !values.one || !values.two || !values.three || !values.four
            }
            onClick={handleVerify}
            id="verifybutton"
            className={`${
              isLoading ? 'loading' : ''
            }btn btn-active text-[1.1rem] w-[60%] 5xl:w-[15rem] mt-5 disabled:text-black/50 disabled:bg-black/10`}
            // onClick={handleLogin}
          >
            Verify
          </button>

          <div className="w-full text-left mt-5">
            <p className="border-b-2 w-fit border-blue-500 text-blue-500 text-[.9rem] ">
              Resend OTP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
