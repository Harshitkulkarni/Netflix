import React, { useState } from "react";
import Headder from "./Headder";

const Login = () => {
  const [issignInForm, SetisSignInFrom] = useState(true);

  const handleTogleSignIn = () => {
    SetisSignInFrom(!issignInForm);
  };
  return (
    <div>
      <div className="absolute">
        <Headder />
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/0cf2c109-3af1-4a9d-87d7-aecfac5fe881/web/IN-en-20250217-TRIFECTA-perspective_c3376e06-9aff-4657-aafb-91256a597b7c_small.jpg"
          alt="background-img"
        />
      </div>
      <form className="absolute max-w-md my p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-80">
        <h1 className="font-bold text-3xl py-4  text-white">
          {issignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!issignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full text-white bg-transparent border-2 border-gray-700"
          />
        )}
        <input
          type="text"
          placeholder="email"
          className="p-4 my-4 w-full bg-transparent text-white border-2 border-gray-700"
        />
        <input
          type="password"
          placeholder="password"
          className="p-4 my-4 w-full bg-transparent border-2 text-white border-gray-700"
        />
        <button className="p-4 my-6 bg-red-500 text-white w-full">
          {issignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-white">
          {issignInForm ? "New to Netflix?" : "Exsisting User!.."}
        </p>
        <p
          className="text-white cursor-pointer hover:underline font-bold text-lg"
          onClick={() => handleTogleSignIn()}
        >
          {issignInForm ? " Sign Up" : "Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
