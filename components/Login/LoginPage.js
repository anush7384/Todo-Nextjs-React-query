import React, { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

import { todoApi } from "../../utils/api";
import { setCookie } from "../../utils/helper";

function LoginPage() {

  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  
  const router = useRouter();
  
  const url = todoApi.concat("users/login");

  const loginUser = async (data) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };


  const { mutate, isLoading } = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log("SUCCESS\n");
      localStorage.setItem("token", data.token);
      setCookie(data.token);
      router.push("/home");
    },
    onError: () => {
      console.log("error");
    },
    onMutate: () => {
      console.log("reached post axios");
    },
  });

  const loginHandler = () => {
    const obj = {
      email: userEmail,
      password: userPass,
    };
    if (userEmail !== "" && userPass !== "") mutate(obj);
    setUserEmail("");
    setUserPass("");
  };

  return (
    <div className="flex justify-center">
      <div className="mt-10 flex w-1/4  flex-col ">
        <div className="h-20 flex justify-center ">
          <h1 className="text-6xl font-serif mt-5">Login</h1>
        </div>
        <input
          className="mt-10 h-10 rounded-xl pl-2 focus:outline-none"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        ></input>
        <input
          className="h-10 mt-5 rounded-xl pl-2 focus:outline-none"
          placeholder="Password"
          value={userPass}
          onChange={(e) => setUserPass(e.target.value)}
        ></input>
        <div className="flex justify-center">
          <button
            className="w-40 rounded-xl h-8 mt-5 bg-blue-500"
            onClick={loginHandler}
          >
            {isLoading != true ? "Login" : "Logging in"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
