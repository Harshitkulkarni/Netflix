import React, { useEffect } from "react";
import InsideHeadder from "./InsideHeadder";
import { API_OPTIONS, API_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addnowPlayingMovies } from "../utils/moviesData";
import useMoviesData from "../Hooks/useMoviesData";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useMoviesData();
  return (
    <div>
      <InsideHeadder />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
