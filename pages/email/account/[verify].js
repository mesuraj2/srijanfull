import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
export default function Verify({ verifyId }) {
  const toast = useToast();
  const router = useRouter();
  const [login, setlogin] = useState(false);

  useEffect(() => {
    if (!verifyId) {
      Router.push("/404");
    }
  }, []);

  const verify = async () => {
    const { data } = await axios.post("/api/auth/verify", {
      id: router.query.verify,
    });
    console.log(data);
    toast({
      title: "Suessfully verified",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    setlogin(true);
  };
  return (
    <div>
      {login ? (
        <Link href="/Login">Login</Link>
      ) : (
        <button onClick={verify}>click here to verify</button>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `http://localhost:3000/api/auth/verifyId?id=${context.query.verify}`,
    {
      // const res =await fetch(`https://poolandsave.com/api/offer/offerdetail`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let data = await res.json();
  return {
    props: { verifyId: data.verify }, // will be passed to the page component as props
  };
}
