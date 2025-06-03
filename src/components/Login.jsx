import React, { useState, useRef } from "react";
import { checkValidData } from "../utils/vilidate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import InsideHeadder from "./InsideHeadder";
import { FaRegCheckCircle } from "react-icons/fa";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleClick = () => {
    // Validate the form
    const message = checkValidData(email, password);
    setErrorMessage(message);

    // Sign In / Sign Up
    if (message) return;

    if (!isSignInForm) {
      // Sign Up logic
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              setErrorMessage("Unable to update name");
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      // Sign In logic
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  const handleToggleSignIn = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/0cf2c109-3af1-4a9d-87d7-aecfac5fe881/web/IN-en-20250217-TRIFECTA-perspective_c3376e06-9aff-4657-aafb-91256a597b7c_small.jpg"
          alt="background"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative z-10">
        <InsideHeadder />

        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-black bg-opacity-75 p-16 rounded-md w-full max-w-md mx-4">
            <h1 className="text-white text-3xl font-bold mb-8">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {!isSignInForm && (
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=" "
                    className="w-full bg-[#333] text-white px-5 pt-5 pb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 peer"
                  />
                  <label className="absolute text-[#8c8c8c] text-sm left-5 top-5 transition-all duration-200 peer-focus:text-xs peer-focus:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2">
                    Full Name
                  </label>
                </div>
              )}

              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  className="w-full bg-[#333] text-white px-5 pt-5 pb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 peer"
                />
                <label className="absolute text-[#8c8c8c] text-sm left-5 top-5 transition-all duration-200 peer-focus:text-xs peer-focus:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2">
                  Email
                </label>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  className="w-full bg-[#333] text-white px-5 pt-5 pb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 peer"
                />
                <label className="absolute text-[#8c8c8c] text-sm left-5 top-5 transition-all duration-200 peer-focus:text-xs peer-focus:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8c8c8c] text-sm"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>

              {errorMessage && (
                <p className="text-[#e87c03] text-sm p-2 rounded-md bg-[#e87c03]/10 border border-[#e87c03]">
                  {errorMessage}
                </p>
              )}

              <button
                onClick={handleClick}
                className="w-full bg-[#e50914] text-white py-3 rounded-md font-semibold hover:bg-[#f6121d] transition duration-200"
              >
                {isSignInForm ? "Sign In" : "Sign Up"}
              </button>

              <div className="flex items-center mt-2 text-[#b3b3b3] text-sm">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember">Remember me</label>
              </div>

              <div className="mt-16 text-[#737373]">
                <p className="mb-4">
                  {isSignInForm ? "New to Netflix?" : "Already a member?"}{" "}
                  <button
                    onClick={handleToggleSignIn}
                    className="text-white hover:underline"
                  >
                    {isSignInForm ? "Sign up now" : "Sign in now"}
                  </button>
                </p>
                {isSignInForm && (
                  <p className="text-sm">
                    This page is protected by Google reCAPTCHA to ensure you're
                    not a bot.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
