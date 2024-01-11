"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
const SignupPage = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submitHandler = async () => {
    try {
      const res = await axios.post("/api/users/signup", user);
      router.push("/login");
      toast.success(res.data.message);
      console.log(res.data.message);
    } catch (error: any) {
      console.log(error);
      toast(error.response.data.message);
    }
  };
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    )
      return setDisabled(false);

    return setDisabled(true);
  }, [user]);
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-blue-300">
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h1 className="text-bold ">SIGNUP</h1>
          <div className="flex flex-col my-4 gap-4">
            <div className="flex flex-col ">
              <label>Username</label>
              <input
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                value={user.username}
                className="border-2 outline-none px-1 border-gray-600 rounded-md"
                placeholder="enter username"
                type="text"
              />
            </div>
            <div className="flex flex-col ">
              <label>Email</label>
              <input
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
                className="border-2 outline-none px-1 border-gray-600 rounded-md"
                placeholder="enter email"
                type="email"
              />
            </div>
            <div className="flex flex-col ">
              <label>Password</label>
              <input
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                value={user.password}
                className="border-2 outline-none px-1 border-gray-600 rounded-md"
                placeholder="enter password"
                type="password"
              />
            </div>
            <button
              onClick={submitHandler}
              className={`${
                disabled ? "bg-[#e3e3e3]" : "bg-pink-200"
              } border-2 w-[50%] mx-auto rounded-lg border-zinc-400 my-2 `}
            >
              Signup
            </button>
            <Link
              href="/login"
              className="text-[1vw] text-center text-blue-600"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
