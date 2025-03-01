import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMoviesSuggestion = () => {
  const { fetchedMovies, moviesName } = useSelector(
    (store) => store.moviesData
  );

  if (!moviesName || !fetchedMovies) return null;

  return (
    <div className="bg-black text-white">
      {moviesName.map((movieName, index) => (
        <MovieList
          key={movieName}
          title={movieName}
          movies={fetchedMovies[index]} // Accessing fetchedMovies using the index
        />
      ))}
    </div>
  );
};

export default GptMoviesSuggestion;
