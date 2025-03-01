import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { removeUser, addUser } from "../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";
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
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10">
        <div className="flex items-center">
          <img className="w-48" src={Logo} alt="Logo" />
          {user && (
            <ul className="flex flex-wrap text-white align-middle mx-4">
              <Link to="/">
                <button className="mx-2 hover:font-bold">Home</button>
              </Link>
              <Link to="/tvprograms">
                <button className="mx-2 hover:font-bold">TV Programs</button>
              </Link>
              <Link to="/films">
                <button className="mx-2 hover:font-bold">Films</button>
              </Link>
              <Link to="/search">
                <button className="mx-2 hover:font-bold">Search</button>
              </Link>
            </ul>
          )}
        </div>

        {user && (
          <div className="flex items-center px-20">
            <h1 className="mx-4 font-bold text-white">{user.displayName}</h1>
            <img
              className="w-8 h-8 rounded-md mx-4 "
              src={userIcon}
              alt="user-icon"
            />
            <button
              onClick={handleSignOut}
              className="mx-4 hover:font-bold text-white"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsideHeadder;
