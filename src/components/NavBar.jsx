"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

const NavBar = () => {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  console.log(user);
  return (
    <div className="w-screen h-14 bg-black flex items-center justify-center sticky top-0">
      <div className="w-[90%] md:w-[80%] h-full flex items-center justify-between text-white px-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold cursor-pointer" onClick={() => router.push("/")} >Doc</h1>
          <h1 className="text-4xl font-bold cursor-pointer" onClick={() => router.push("/")} >X</h1>
        </div>
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <>
              <button
                type="button"
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-teal-900 dark:text-teal-500 dark:hover:text-teal-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 rounded-[10px]"
                onClick={() => router.push("/document")}
              >
                Workspace
              </button>
              <UserButton afterSignOutUrl="/"  />
            </>
          ) : (
            <>
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 rounded-[8px]"
                onClick={() => router.push("/sign-up")}
              >
                SignUp
              </button>
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 rounded-[8px]"
                onClick={() => router.push("/sign-in")}
              >
                SignIn
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
