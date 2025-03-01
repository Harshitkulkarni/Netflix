import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store?.moviesData?.nowPlayingMovies);
  if (movies == null) return;
  const myDisplayToPageMovie = movies[0];
  //console.log(myDisplayToPageMovie);

  const { original_title, id, overview } = myDisplayToPageMovie;
  return (
    <div className="m-0 p-0">
      <VideoTitle title={original_title} description={overview} id={id} />
      <VideoBackground id={id} />
    </div>
  );
};

export default MainContainer;
