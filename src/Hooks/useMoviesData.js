import { API_OPTIONS, API_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addnowPlayingMovies } from "../utils/moviesData";
import React, { useEffect } from "react";

const useMoviesData = () => {
  const dispatch = useDispatch();
  const fetchMoviesData = async () => {
    const data = await fetch(API_URL, API_OPTIONS);
    const json = await data.json();
    //console.log(json.results);
    dispatch(addnowPlayingMovies(json.results));
  };

  useEffect(() => {
    fetchMoviesData();
  }, []);
};

export default useMoviesData;
