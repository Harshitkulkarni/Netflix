import React from "react";
import { FaPlay } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";

const VideoTitle = ({ title, id, description }) => {
  return (
    <div>
      <div className="w-screen aspect-video pt-[20%] px-24 absolute bg-gradient-to-r from-black">
        <h1 className="text-6xl font-bold text-white">{title}</h1>
        <p className="py-6 text-lg w-1/2 text-white line-clamp-3">
          {description}
        </p>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white hover:bg-opacity-80 text-black font-semibold px-8 py-2 rounded-md transition">
            <FaPlay size={20} /> Play
          </button>
          <button className="flex items-center gap-2 bg-gray-500 bg-opacity-70 hover:bg-opacity-60 text-white font-semibold px-8 py-2 rounded-md transition">
            <IoInformationCircleOutline size={24} /> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
