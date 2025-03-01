import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const nowplayingMovies = useSelector(
    (store) => store.moviesData.nowPlayingMovies
  );

  const popularMovies = useSelector((store) => store.moviesData.popularMovies);
  const trendingMovies = useSelector(
    (store) => store.moviesData.trendingMovies
  );

  return (
    <div className="bg-black">
      <div className="mt-0  md:-mt-52 pl-4 md:pl-12 relative z-20">
        <MovieList title={"Now Playing"} movies={nowplayingMovies} />
        <MovieList title={"Popular"} movies={popularMovies} />
        <MovieList title={"Trending"} movies={trendingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
