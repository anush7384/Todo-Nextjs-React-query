import React, { useState } from "react";
import Link from "next/link";

import { useLoginUser } from "../../src/hooks/userHooks";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { mutate, isLoading } = useLoginUser();

  const loginHandler = () => {
    let obj = user;
    mutate(obj);
    setUser({ email: "", password: "" });
  };

  return (
    <div className="flex justify-center">
      <div className="mt-10 flex w-1/4  flex-col ">
        <div className="h-20 flex justify-center ">
          <h1 className="text-6xl font-serif mt-5 text-blue-500">Login</h1>
        </div>
        <input
          className="mt-10 h-10 rounded-xl pl-2 focus:outline-none"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        ></input>
        <input
          className="h-10 mt-5 rounded-xl pl-2 focus:outline-none"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        ></input>
        <div className="flex justify-center">
          <button
            className="w-40 rounded-xl h-8 mt-5 bg-blue-500 text-white"
            onClick={loginHandler}
          >
            {isLoading != true ? "Login" : "Logging in"}
          </button>
        </div>
        <div className="mt-2 flex justify-center text-gray-700">
          New User?
          <Link href="/signup" className="text-blue-600 outline-none">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
