import React ,{useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import Router from 'next/router'
import Link from 'next/link'
import {useToast} from "@chakra-ui/react";
export default function Verify() {
  const toast = useToast();
  const router = useRouter()
  const [login, setlogin] = useState(false)
  const [mverify, setverify] = useState(true)
  // const { pid } = router.query
    const verify=async ()=>{
      console.log(router.query.verify)
      const res =await fetch(`/api/auth/verify/${router.query.verify}`, {
        method: 'POST', // or 'PUT'
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        // body:JSON.stringify(value),
      })
      let data=await res.json()
      console.log(data)
      if(data.session==false){
        setverify(false)
        setlogin(true)
        toast({
          title: "Session expired it was only available for 3 hours",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
      else{
        toast({
          title: "Suessfully verified",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setverify(false)
        setlogin(true)
      // setverify(false)
    }
      
      // // localStorage.setItem("token",data.authtoken)
      // // // getdata();
      // // // console.log(data.authtoken)
      // Router.push('/')
    }
    useEffect(() => {
      if(localStorage.getItem('token')!=null){
        Router.push('/')
      }
    }, [])
  return (
    <div>
     {mverify && <button onClick={verify}>click here to verify</button>}
     {login && <Link href="/Login">Login</Link>}
    
     
      {/* <p>{pid}</p> */}
    </div>
  )
}

