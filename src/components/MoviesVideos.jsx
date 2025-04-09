import React from "react";

const MoviesVideos = ({ videoId }) => {
  return (
    <div className="bg-slate-900 m-5  pt-5">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
        //allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MoviesVideos;
