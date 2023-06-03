import Image from 'next/image';
import React, { useState } from 'react';
import FooterT2 from '../../components/FooterT2';
import ImageUploader from '../../components/ImageUploader';
import NavbarT2 from '../../components/NavbarT2';

const Inputfield = ({
  values,
  onBlur,
  handleChange,
  touched,
  name,
  title,
  type = 'text',
}) => {
  return (
    <div className="form-control  mx-auto ">
      <label className="label">
        <span className="label-text">{title}</span>
      </label>
      <input
        type={type}
        placeholder=""
        name={name}
        className="input input-bordered w-[30rem]"
        value={values[name]}
        onChange={handleChange}
        onBlur={onBlur}
      />
      {touched[name] && !values[name] && (
        <span className="label-text-alt mt-1 text-red-600">Required</span>
      )}
    </div>
  );
};

const CreateOffer = () => {
  const [images, setImages] = useState([]);

  const initValues = {
    offerName: '',
    imageArr: '',
    category: '',
    description: '',
    quantity: 1,
    brand: '',
    locationdescription: '',
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

  const submitHandler = (e) => {
    e.preventDefault();
    setData((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        ['imageArr']: images,
      },
    }));

    console.log(data);
  };

  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="">
          <label className="label">
            <span className="label-text">Upload Images (max: 5)</span>
          </label>
          <ImageUploader setImages={setImages} />
          {/* <input
                type="file"
                name="new-offer-images"
                multiple
                className="file-input w-[30rem]"
              /> */}
        </div>
        {/* <div className="form-control  mx-auto ">
            <label className="label">
              <span className="label-text">Offer Name</span>
            </label>
            <input
              type="text"
              placeholder=""
              name="offerName"
              className="input input-bordered w-[30rem]"
              value={values.offerName}
              onChange={handleChange}
              onBlur={onBlur}
            />
            {touched.offerName && !values.offerName && (
              <span className="label-text-alt mt-1 text-red-600">Required</span>
            )}
          </div> */}
        <Inputfield
          values={values}
          touched={touched}
          title="Offer Name"
          name="offerName"
          handleChange={handleChange}
          onBlur={onBlur}
        />
        <Inputfield
          values={values}
          touched={touched}
          title="Catigory"
          name="category"
          handleChange={handleChange}
          onBlur={onBlur}
        />
        <div className="">
          <label className="label">
            <span className="label-text">Offer Description</span>
          </label>
          <textarea
            className="textarea w-[30rem]"
            placeholder=""
            name="description"
            onChange={handleChange}
            onBlur={onBlur}
            value={values.description}
          />
        </div>
        <Inputfield
          values={values}
          touched={touched}
          title="Quantity"
          name="quantity"
          handleChange={handleChange}
          onBlur={onBlur}
          type="number"
        />
        <Inputfield
          values={values}
          touched={touched}
          title="Brand"
          name="brand"
          handleChange={handleChange}
          onBlur={onBlur}
        />
        <Inputfield
          values={values}
          touched={touched}
          title="Location Description"
          name="locationdescription"
          handleChange={handleChange}
          onBlur={onBlur}
        />
      </div>

      <div className="flex items-center justify-center pb-[5rem] gap-5 pt-[2rem]">
        <button
          onClick={submitHandler}
          className="btn  btn-outline secondary_font  mt-5  text-[1.2rem] w-[20rem]"
        >
          Create New Offer
        </button>
        <button
          disabled={true}
          className="btn btn-error text-white secondary_font bg-red-500 mt-5  text-[1.2rem] w-[20rem]"
        >
          Pool Now
        </button>
      </div>
    </div>
  );
};

export default CreateOffer;
