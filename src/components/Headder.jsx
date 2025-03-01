import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../utils/constants";

const Headder = () => {
  return (
    <div className="flex justify-between items-center absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10">
      <div className="flex items-center">
        <img className="w-48" src={Logo} alt="Logo" />

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
      </div>
    </div>
  );
};

export default Headder;
