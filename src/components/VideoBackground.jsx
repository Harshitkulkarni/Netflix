import React from "react";
import { useSelector } from "react-redux";
import useVideoBackgroundTrailer from "../Hooks/useVideoBackgroundTrailer";

const VideoBackground = ({ id }) => {
  useVideoBackgroundTrailer(id);
  const trailerId = useSelector((store) => store.moviesData.Trailers);
  //console.log(trailerId);
  if (!trailerId || trailerId.length === 0) {
    return <div>No trailer available.</div>;
  }

  return (
    <div className="w-screen">
      <iframe
        className="w-full aspect-video "
        src={
          "https://www.youtube.com/embed/" +
          trailerId[0]?.key +
          "?&autoplay=1&mute=1"
        }
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
