import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, title }) => {
  //console.log(movies);
  return (
    movies && (
      <div className="px-6">
        <h1 className="text-stone-100 py-10 text-3xl">{title}</h1>
        <div className="flex overflow-x-scroll ">
          <div className="flex my-4">
            {movies.map((movie) => (
              <MovieCard key={movie?.id} imgLink={movie?.poster_path} />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default MovieList;
