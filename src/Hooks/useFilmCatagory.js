import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useFilmCatagory = () => {
  const [genres, setGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [error, setError] = useState(null);

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
        API_OPTIONS
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setGenres(data.genres);
      return data.genres;
    } catch (error) {
      setError(error.message);
      return [];
    }
  };

  const fetchMovies = async (genreId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&region=IN&with_original_language=hi`,
        API_OPTIONS
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      setError(error.message);
      return [];
    }
  };

  const fetchMoviesByGenre = async () => {
    const genres = await fetchGenres();
    const moviesByGenrePromises = genres.map(async (genre) => {
      const movies = await fetchMovies(genre.id);
      return { [genre.name]: movies };
    });
    const moviesByGenreResults = await Promise.all(moviesByGenrePromises);
    const moviesByGenre = moviesByGenreResults.reduce(
      (acc, genreData) => ({ ...acc, ...genreData }),
      {}
    );
    setMoviesByGenre(moviesByGenre);
  };

  useEffect(() => {
    fetchMoviesByGenre();
  }, []);

  return { genres, moviesByGenre, error };
};

export default useFilmCatagory;
