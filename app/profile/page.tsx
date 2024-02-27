"use client";
import React from "react";
import LoginForm from "./LoginForm";
import { signOut, useSession } from "next-auth/react";
import ProfileForm from "./ProfileForm";
import Bookmark from "./Bookmark";
import useScrapedProductManagement from "../helpers/useScrapedProductManagement";

const Page = () => {
  const { isLoading } = useScrapedProductManagement();
  const session = useSession();
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <section className="flex flex-col">
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          {session.status === "authenticated" && (
            <section className="flex justify-end ">
              <section className="flex flex-col items-end">
                <ProfileForm
                  name={session.data.user?.name}
                  email={session.data.user?.email}
                />
                <button
                  className="bg-gray-500 hover:bg-gray-400 text-sm text-white p-2 rounded"
                  onClick={() => handleLogout()}
                >
                  Sign out
                </button>
              </section>
            </section>
          )}
        </>
      )}
      {session.status === "unauthenticated" && (
        <section>
          <LoginForm />
        </section>
      )}
      {session.status === "authenticated" && (
        <section className="flex-1">
          <Bookmark />
        </section>
      )}
    </section>
  );
};

export default Page;
