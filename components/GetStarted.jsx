import Link from 'next/link';
import React from 'react';

const GetStarted = () => {
  return (
    <div className="flex flex-row gap-5 lg:gap-10 ">
      <Link
        href="/login"
        class="btn btn-active uppercase tracking-wider text-[1rem] 14xl:text-[1.1rem] secondary_font font-normal bg-black/90"
      >
        LogIn
      </Link>
      <Link
        href={'/login?signup=true'}
        class="btn btn-outline tracking-wider text-[1rem] 14xl:text-[1.1rem] secondary_font font-normal"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default GetStarted;