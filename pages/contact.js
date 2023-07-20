import { useRouter } from 'next/router';
import React from 'react';

const faqs = () => {
  const router = useRouter();
  return (
    <div className="w-screen bg-[#B9E9FC]">
      <div className="flex flex-col justify-center items-center gap-10 pt-[2rem] pb-[5rem] mx-auto px-4 md:px-0 text-[1.1rem] text-justify w-[80%]">
        <h1 className="text-center text-[2rem] md:text-[3rem] main__font tracking-wider ">
          Faqs
        </h1>
        <div className="flex flex-col gap-5 items-center pb-[8rem]">
          <p className="text-[1rem] md:text-[1.15rem] text-justify">
            If you want to delete account or want to unsubscribe from all
            marketing emails
          </p>
          <button
            className="btn btn-error btn-outline"
            onClick={() => router.push('/account/delete')}
          >
            Click here
          </button>
        </div>
      </div>
    </div>
  );
};

export default faqs;
