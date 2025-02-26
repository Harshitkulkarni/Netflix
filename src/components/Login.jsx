import React, { useState } from "react";

import { useRef } from "react";
import { checkValidData } from "../utils/vilidate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { USER_AVATAR } from "../utils/constants";
import InsideHeadder from "./InsideHeadder";

const Login = () => {
  const [isSignInForm, SetisSignInFrom] = useState(true);
  const [errorMessege, setErrorMessage] = useState();

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleClick = () => {
    //vidate the form

    const Messege = checkValidData(email.current.value, password.current.value);
    setErrorMessage(Messege);

    // sign In / sign Up
    if (Messege) return;

    if (!isSignInForm) {
      // if the user is not sign in
      // then sign up and this is the sign up logic

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          //console.log(user);
          updateProfile(auth, {
            displayName: name.current.value,
            //photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage("Unable to update name");
            });

          //console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          //console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  const handleTogleSignIn = () => {
    SetisSignInFrom(!isSignInForm);
  };
  return (
    <div>
      <div className="absolute">
        <InsideHeadder />
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/0cf2c109-3af1-4a9d-87d7-aecfac5fe881/web/IN-en-20250217-TRIFECTA-perspective_c3376e06-9aff-4657-aafb-91256a597b7c_small.jpg"
          alt="background-img"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute max-w-md my p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4  text-white">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full text-white bg-transparent border-2 border-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="email"
          className="p-4 my-4 w-full bg-transparent text-white border-2 border-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="password"
          className="p-4 my-4 w-full bg-transparent border-2 text-white border-gray-700"
        />
        <p className="text-red-500 text-lg">{errorMessege}</p>
        <button
          onClick={handleClick}
          className="p-4 my-6 bg-red-500 text-white w-full"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-white">
          {isSignInForm ? "New to Netflix?" : "Exsisting User!.."}
        </p>
        <p
          className="text-white cursor-pointer hover:underline font-bold text-lg"
          onClick={handleTogleSignIn}
        >
          {isSignInForm ? " Sign Up" : "Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
