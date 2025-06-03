import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addSearchedMovies, setLoading } from "../utils/moviesData";
import { API_OPTIONS } from "../utils/constants";
import LoadingSpinner from "./LoadingSpinner";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const fetchResultMovie = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&region=IN&with_original_language=hi`,
      API_OPTIONS
    );

    const json = await data.json();
    return json.results;
  };

  const handleSearchResult = async () => {
    const searchQuery = searchText.current.value;

    if (!searchQuery) {
      console.error("Search query is empty");
      return;
    }

    try {
      dispatch(setLoading(true));

      // Using Gemini model
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-preview-05-20",
      });

      const prompt = `Act as a movie recommendation system and suggest some movies for the query: ${searchQuery}. Give me only 5 movies, comma-separated like the given example ahead. Example result: gaddar, koi mil gaya, padosan, razz, ddlj. Only return the movie names, no other text.And if the user just type the movie name then give the movie itself`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const movieList = response.text().trim();

      const resultMovies = movieList.split(",").map((movie) => movie.trim());
      const promiseArray = resultMovies.map((movie) => fetchResultMovie(movie));
      const tmdbResult = await Promise.all(promiseArray);

      dispatch(
        addSearchedMovies({
          moviesName: resultMovies,
          fetchedMovies: tmdbResult,
        })
      );
    } catch (err) {
      console.error("Error fetching response:", err);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="pt-[10%]">
      <form
        className="w-1/2 bg-black grid grid-cols-12 mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 rounded-md"
          placeholder="Let's watch something good"
        />
        <button
          className="col-span-3 m-4 py-2 px-4 text-white rounded-lg bg-red-600 hover:bg-red-700 transition-colors disabled:bg-red-800 disabled:cursor-not-allowed"
          onClick={handleSearchResult}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
