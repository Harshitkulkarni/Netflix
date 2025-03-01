import { API_OPTIONS, API_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {
  addnowPlayingMovies,
  addPopularMovies,
  addTrendingMovies,
} from "../utils/moviesData";
import React, { useEffect } from "react";

const useMoviesData = () => {
  const dispatch = useDispatch();
  const fetchNowPlayingMovies = async () => {
    const data = await fetch(API_URL, API_OPTIONS);
    const json = await data.json();
    //console.log(json.results);
    dispatch(addnowPlayingMovies(json.results));
  };

  const fetchPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/movie?&region=IN&with_original_language=hi&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    //console.log(json.results);
    dispatch(addPopularMovies(json.results));
  };
  const fetchTrendingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      API_OPTIONS
      //https://api.themoviedb.org/3/discover/movie?&region=IN&with_original_language=hi`
      //https://api.themoviedb.org/3/discover/movie?with_genres=28,12&region=IN&with_original_language=hi
    );
    const json = await data.json();
    //console.log(json.results);
    dispatch(addTrendingMovies(json.results));
  };

  useEffect(() => {
    fetchNowPlayingMovies();
    fetchPopularMovies();
    fetchTrendingMovies();
  }, []);
};

export default useMoviesData;
