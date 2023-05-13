import React, { useEffect } from 'react';
import { useState } from 'react';

const login = () => {
  const initValues = {
    uname: '',
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="w-screen h-screen bg-[#B9E9FC] secondary_font">
      <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
        <div className="w-[30rem] flex flex-col justify-center items-center gap-3">
          <h1 className="text-left  text-[3rem] main__font tracking-wider">
            Pool & Save
          </h1>
          <p className="text-left  text-[1rem] main__font tracking-wider">
            Please enter your username and password to proceed.
          </p>
          <div className="">
            <div className="form-control w-[28rem]">
              <label className="label">
                <span className="label-text text-black/60">username*</span>
              </label>
              <input
                value={values.uname}
                onChange={handleChange}
                onBlur={onBlur}
                type="text"
                name="uname"
                className={`${
                  touched.uname && !values.uname ? 'bg-red-100' : 'bg-white'
                } input input-bordered w-[28rem]`}
              />
              {touched.uname && !values.uname && (
                <span className="label-text-alt mt-1 text-red-600">
                  Required
                </span>
              )}
            </div>
            <div className="form-control w-[28rem]">
              <label className="label">
                <span className="label-text text-black/60">password*</span>
              </label>
              <input
                value={values.password}
                onChange={handleChange}
                onBlur={onBlur}
                type="text"
                name="password"
                className={`${
                  touched.password && !values.password
                    ? 'bg-red-100'
                    : 'bg-white'
                } input input-bordered w-[28rem]`}
              />
              {touched.password && !values.password && (
                <span className="label-text-alt mt-1 text-red-600">
                  Required
                </span>
              )}
            </div>
          </div>
          <button
            disabled={!values.uname || !values.password}
            className={`${
              isLoading ? 'loading' : ''
            }btn btn-active text-[1.1rem] w-[28rem] mt-10 disabled:text-black/50 disabled:bg-black/10`}
          >
            Login
          </button>
          <div className="divider">OR</div>
        </div>
      </div>
    </div>
  );
};

export default login;
