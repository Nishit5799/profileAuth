"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function Home() {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      router.push("/login");
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-blue-500 flex flex-col items-center justify-center h-screen w-full">
      <h1>I am home</h1>
      <button
        className="border-2 rounded-md p-1 border-zinc-600 bg-red-400"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
}
