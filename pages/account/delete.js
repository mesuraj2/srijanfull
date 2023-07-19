import React, { useState } from 'react';
import Carousel from '../../components/Carousel';
import axios from 'axios'
import { useToast } from '@chakra-ui/toast';

const deletePage = () => {
  const [email, setemail] = useState('')
  const [unsub, setunsub] = useState(false)
  const [sure, setsure] = useState(false)
  const toast = useToast();

  const handleDelete = async () => {
    const response = await axios.post('https://script.google.com/macros/s/AKfycbw6GMdKiF_s1rtFroX2EuYMWzMTviulvJa0zXLqe-q-vVn8HCNUrRL9MhPu5cCDStLW/exec',
      { email: email, unsub: unsub })
    console.log(response.data)
    toast({
      title: 'Error Occured!',
      description: 'Failed to Load the chats',
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'bottom-left',
    });
  }

  return (
    <div className="w-screen bg-[#B9E9FC]" style={{ minHeight: 'calc( 90svh - 100px)', display: 'flex', alignContent: 'center' }}>
      <div className="flex flex-col justify-center items-center gap-10 pt-[2rem] pb-[5rem] mx-auto px-4 md:px-0">
        <h3 className="text-[1.8rem] md:text-[2.3rem] 14xl:text-[2.3rem] secondary_font font-[600] tracking-wider text-black/70">
          Account Deletion
        </h3>
        <div className="form-control w-[90%] mx-auto 5xl:w-[28rem]">
          <input
            value={email}
            onChange={(e)=>{setemail(e.target.value)}}
            // onBlur={onBlur}

            placeholder='Email'
            type="email"
            name="uname"
            className={`input input-bordered w-full`}
          />
          <br />
          <div style={{ paddingLeft: 25 }} className='secondary_font text-black/70'>
            <input type='checkbox' checked={sure} onChange={(e) => { console.log(e.target.checked), setsure(e.target.checked) }} />
            <span style={{ cursor: 'default' }} onClick={() => { setsure(!sure) }}> I understand that deleting my account is permanent and irreversible.
            </span>
          </div>

          <div className='secondary_font text-black/70' style={{ paddingLeft: 25 }}>
            <input type='checkbox' checked={unsub} onClick={(e) => { console.log(e.target.checked), setunsub(e.target.checked) }} />
            <span style={{ cursor: 'default' }} onChange={() => { setunsub(!setunsub) }}> I want to unsubscribe from all marketing emails.
            </span>
          </div>
          <button
            disabled={!sure}
            className={`btn btn-active text-[1.1rem] w-[60%] 5xl:w-[28rem] mt-10 disabled:text-black/50 disabled:bg-black/10`}
            onClick={handleDelete}
          >
            DELETE
          </button>
        </div>
      </div>
    </div >
  );
};

export default deletePage;
