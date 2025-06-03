import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { removeUser, addUser } from "../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { Logo, userIcon } from "../utils/constants";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoHelpCircleOutline } from "react-icons/io5";

const InsideHeadder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

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
    setShowDropdown(false);
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
          <div className="flex items-center mr-4">
            <div
              className="flex items-center cursor-pointer group relative"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                className="w-8 h-8 rounded-md"
                src={userIcon}
                alt="user-icon"
              />
              <IoMdArrowDropdown
                className={`text-white ml-1 text-xl transition-transform duration-200 ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-black/95 border border-gray-700 rounded-md shadow-lg overflow-hidden">
                  {/* User Info Section */}
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <img
                        src={userIcon}
                        alt="profile"
                        className="w-8 h-8 rounded-md"
                      />
                      <div>
                        <p className="text-white font-medium">
                          {user.displayName}
                        </p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-700/50 flex items-center">
                      <MdOutlineAccountCircle className="mr-2 text-xl" />
                      Account Settings
                    </button>
                    <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-700/50 flex items-center">
                      <IoHelpCircleOutline className="mr-2 text-xl" />
                      Help Center
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-left text-white hover:bg-gray-700/50 border-t border-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsideHeadder;
