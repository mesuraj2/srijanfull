import React, { useState, useEffect } from 'react';
import { deleteCookie } from "cookies-next";
import Link from "next/link"
import { useRouter } from 'next/router';
import axios from 'axios';

const UserPanel = ({setsignedin}) => {
  const router = useRouter();
  const [userimage, setuserimage] = useState('');

  const getUser = async () => {
    const res = await axios.get('http://localhost:3000/api/auth/getUser');
    setuserimage(res.data.pic);
  }

  const handleLogout = () => {
    deleteCookie('authtoken');
    setsignedin(false)
    router.push('/')
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        {/* <button className="btn btn-outline">Your offers</button> */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
            <div className="w-10 rounded-full ">
              <img src={userimage ? userimage : 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png'} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link className="justify-between">
                Profile
                {/* <span className="badge">New</span> */}
              </Link>
            </li>
            <li>
              <Link href='/chat'>Chat Room</Link>
            </li>
            <li>
              <Link>Notifications</Link>
            </li>
            <li>
              <Link>Your Cart</Link>
            </li>
            <li>
              <Link>Settings</Link>
            </li>
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
