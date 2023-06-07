import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/FooterT2';
import ImageUploader from '../../components/ImageUploader';
import NavbarT2 from '../../components/NavbarT2';

const Cabshare = () => {
  const initValues = {
    currentLoc: '',
    destination: '',
    description: '',
    distance: 4000,
    expTime: 0,
  };

  const initState = { isLoading: false, error: '', values: initValues };
  const [data, setData] = useState(initState);
  const [touched, setTouched] = useState({});
  const { values, isLoading, error } = data;
  const [selectCustom, setSelectCustom] = useState(false);
  const [customDistance, setCustomDistance] = useState(4);

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
  const submitHandler = (e) => {
    e.preventDefault();
    if (values.distance === 'custom') {
      setData((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          ['distance']: customDistance,
        },
      }));
    }
  };

  useEffect(() => {
    if (values.distance === 'custom') {
      setSelectCustom(true);
    } else {
      setSelectCustom(false);
    }
    console.log(data);
  }, [data, values.distance]);

  const router = useRouter();
  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="w-[90vw] mt-10  6xl:w-[32rem] mx-auto flex flex-col items-center justify-center gap-5">
        <div className="w-[90%] 6xl:w-[30rem]">
          <label className="label">
            <span className="label-text">Current Location</span>
          </label>
          <input
            type="text"
            placeholder=""
            name="currentLoc"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.currentLoc}
            className="input input-bordered w-full mx-auto"
          />
          {/* <div className="">
            <select className="">
              <option disabled selected>
                Pick your favorite Simpson
              </option>
              <option>Homer</option>
              <option>Marge</option>
              <option>Bart</option>
              <option>Lisa</option>
              <option>Maggie</option>
              <option>Homer</option>
              <option>Marge</option>
              <option>Bart</option>
              <option>Lisa</option>
              <option>Maggie</option>
              <option>Homer</option>
              <option>Marge</option>
              <option>Bart</option>
              <option>Lisa</option>
              <option>Maggie</option>
            </select>
          </div> */}
          {touched['currentLoc'] && !values['currentLoc'] && (
            <span className="label-text-alt mt-1 text-red-600">Required</span>
          )}
        </div>
        <div className="w-[90%] 6xl:w-[30rem]">
          <label className="label">
            <span className="label-text">Destination</span>
          </label>
          <input
            type="text"
            placeholder=""
            name="destination"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.destination}
            className="input input-bordered w-full mx-auto"
          />
          {touched['destination'] && !values['destination'] && (
            <span className="label-text-alt mt-1 text-red-600">Required</span>
          )}
        </div>
        <div className="w-[90%] 6xl:w-[30rem]">
          <label className="label">
            <span className="label-text">Discription</span>
          </label>
          <textarea
            name="description"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.description}
            className="textarea w-full mx-auto"
            placeholder=""
          />
          {touched['description'] && !values['description'] && (
            <span className="label-text-alt mt-1 text-red-600">Required</span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 pb-[3rem] pt-[1rem]">
        <img
          src="/img/map.jpg"
          className="w-[90vw] 6xl:w-[30rem]"
          alt="image"
        />
        <select
          className={`select  w-fit mx-auto`}
          value={values.distance}
          onChange={handleChange}
          name={'distance'}
        >
          <option disabled value="" selected>
            Pick Radius
          </option>
          <option value={100}>100 m</option>
          <option value={200}>200 m</option>
          <option value={500}>500 m</option>
          <option value={1000}>1 km</option>
          <option value={2000}>2 km</option>

          <option value={'custom'}>Custom</option>
        </select>
        <div className={`flex-col ${!selectCustom ? 'hidden' : 'flex'} gap-3`}>
          <p>Search under {customDistance} km</p>
          <div>
            <input
              type="range"
              min="0"
              max="10"
              name="distance"
              value={customDistance}
              className="range range-xs"
              step="0.1"
              onChange={(e) => setCustomDistance(e.target.value)}
            />
            <div className="w-[30rem] flex justify-between text-xs px-2">
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label>
            <span className="label-text">Expires in</span>
          </label>
          <select
            className={`${
              touched.expTime && !values.expTime ? 'bg-red-100' : 'bg-white'
            } select w-[90vw] 6xl:w-[30rem]`}
            value={values.expTime}
            onChange={handleChange}
            onBlur={onBlur}
            name="expTime"
          >
            <option disabled value="" selected>
              Select duration
            </option>
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>1 hour</option>
          </select>
          {touched.expTime && !values.expTime && (
            <span className="label-text-alt mt-1 text-red-600">Required</span>
          )}
        </div>
      </div>
      <div className="flex items-center pb-[5rem]">
        <button
          disabled={
            !values.distance ||
            !values.description ||
            !values.destination ||
            !values.currentLoc
          }
          className="btn btn-error text-white secondary_font bg-red-500 6xl:mt-5 mx-auto text-[1.2rem] w-[15rem] 6xl:w-[20rem]"
          onClick={(e) => submitHandler(e)}
        >
          Start Pooling
        </button>
      </div>
    </div>
  );
};

export default Cabshare;
