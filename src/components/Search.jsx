import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMoviesSuggestion from "./GptMoviesSuggestion";
import Headder from "./Headder";

const Search = () => {
  return (
    <div>
      <div className="absolute w-full h-screen bg-black -z-10"></div>
      <Headder />
      <GptSearchBar />
      <GptMoviesSuggestion />
    </div>
  );
};

export default Search;
