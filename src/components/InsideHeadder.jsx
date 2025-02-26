import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { removeUser, addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { Logo, userIcon } from "../utils/constants";

const InsideHeadder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);
  const user = useSelector((store) => store.user);
  //console.log(user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        //dispatch(removeUser());
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div>
      <div className=" flex justify-between absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10">
        <div>
          <img className="w-48 " src={Logo} alt="" />
        </div>

        {user && (
          <div className="flex ">
            <div className="grid content-center">
              <ul className="flex flex-wrap text-white align-middle mx-4 ">
                <button className="mx-2 hover:font-bold">Home</button>
                <button className="mx-2 hover:font-bold">Tv Programs</button>
                <button className="mx-2 hover:font-bold">Films</button>
                <button className="mx-2 hover:font-bold">Originals</button>
                <button className="mx-2 hover:font-bold">Recently Added</button>
                <button className="mx-2 hover:font-bold">My List</button>
              </ul>
            </div>

            <div className="grid content-center ">
              <ul className="flex flex-wrap text-white align-middle mx-4 ">
                <img
                  className="w-8 h-8 rounded-md mx-2"
                  src={userIcon}
                  alt="user-icon"
                />
                {/* <button className="mx-2 hover:font-bold">Home</button> */}
                <button
                  onClick={handleSignOut}
                  className="mx-2 hover:font-bold"
                >
                  Sign Out
                </button>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsideHeadder;
