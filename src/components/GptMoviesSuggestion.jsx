import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import LoadingSpinner from "./LoadingSpinner";

const GptMoviesSuggestion = () => {
  const { fetchedMovies, moviesName } = useSelector(
    (store) => store.moviesData
  );
  const isLoading = useSelector((store) => store.moviesData.isLoading);

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
