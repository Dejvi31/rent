"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation.js";

const Login = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <>
      <button
        className="bg-gray-800 hover:bg-gray-400 text-white px-4 py-2 rounded"
        onClick={() => router.push("/profile")}
      >
        {session.status === "authenticated" ? (
          <img
            src={session.data.user.image}
            alt={session.data.user.name}
            width={40}
            height={40}
            referrerPolicy="no-referrer"
            className="rounded-full"
          />
        ) : (
          "Sign In"
        )}
      </button>
    </>
  );
};

export default Login;
