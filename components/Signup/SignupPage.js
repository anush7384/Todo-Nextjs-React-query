import React, { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";

import { todoApi } from "../../utils/api";
import { setCookie } from "../../utils/helper";

function SignupPage() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");

  const router = useRouter();

  const url = todoApi.concat("users");

  const registerUser = async (data) => {
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

  const { mutate, isLoading } = useMutation(registerUser, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setCookie(data.token);
      router.push("/home");
    },
    onError: () => {
      alert("Error !!");
    },
  });

  const signupHandler = () => {
    const obj = {
      name: userName,
      email: userEmail,
      password: userPass,
    };
    mutate(obj);
    setUserEmail("");
    setUserPass("");
    setUserName("");
  };

  return (
    <div className="flex justify-center">
      <div className="mt-10 flex w-1/4  flex-col ">
        <div className="h-20 flex justify-center ">
          <h1 className="text-6xl font-serif mt-5">SignUp</h1>
        </div>
        <input
          className="mt-10 h-10 rounded-xl pl-2 focus:outline-none"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <input
          className="mt-5 h-10 rounded-xl pl-2 focus:outline-none"
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
            onClick={signupHandler}
          >
            {isLoading != true ? "Signup" : "Signing Up"}
          </button>
        </div>
        <div className="mt-2 flex justify-center text-gray-700">
          Already have an account?
          <Link href="/" className="text-blue-600 outline-none">login</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
