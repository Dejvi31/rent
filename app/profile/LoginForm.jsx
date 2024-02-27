import React from "react";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const handleLogin = async (provider) => {
    try {
      await signIn(provider, {
        redirect: true,
        callbackUrl: "http://localhost:3000",
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <section>
      <button
        className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded"
        onClick={() => handleLogin("google")}
      >
        Sign In with Google
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
        onClick={() => handleLogin("facebook")}
      >
        Sign In with Facebook
      </button>
      <button
        className="bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 rounded"
        onClick={() => handleLogin("instagram")}
      >
        Sign In with Instagram
      </button>
    </section>
  );
};

export default LoginForm;
