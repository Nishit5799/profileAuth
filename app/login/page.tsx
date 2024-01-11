"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
toast;
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async () => {
    try {
      const res = await axios.post("/api/users/login", user);
      router.push("/");
      toast.success(res.data.message);
      console.log(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
      setUser({ email: "", password: "" });
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [user]);
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-blue-300">
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h1 className="text-bold ">LOGIN</h1>
          <div className="flex flex-col my-4 gap-4">
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
                className="border-2 outline-none px-1 border-gray-600 rounded-md"
                placeholder="enter password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <button
              onClick={submitHandler}
              className={`${
                disabled ? "bg-[#e3e3e3] cursor-not-allowed" : "bg-pink-200"
              } border-2 w-[50%] mx-auto rounded-lg border-zinc-400 my-2 `}
            >
              Login
            </button>
            <Link
              href="/signup"
              className="text-[1vw] text-center text-blue-600"
            >
              Don't have an account? Signup
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
