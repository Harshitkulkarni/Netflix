import React from "react";

const VideoTitle = ({ title, id, description }) => {
  return (
    <div>
      <div className="w-screen aspect-video pt-96 px-24 absolute bg-gradient-to-r from-black">
        <h1 className="text-6xl font-bold text-yellow-400">{title}</h1>
        <p className="py-5 text-lg w-1/2 text-white">{description}</p>
        <div>
          <button className="bg-white hover:bg-slate-300 text-black opacity-90 m-2 p-2 px-10 rounded-md">
            Play ▶️
          </button>
          <button className="bg-gray-100 text-black opacity-20 m-2 p-2 px-10 rounded-md">
            More info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
