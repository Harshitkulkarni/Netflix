import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addSearchedMovies } from "../utils/moviesData";
import { API_OPTIONS } from "../utils/constants";

const DeepSeekSearchBar = () => {
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
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAPI_KEY}`, // Use environment variable
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "user",
              content: `Act as a movie recommendation system and suggest some movies for the query: ${searchQuery}. Give me only 5 movies, comma-separated like the given example ahead. Example result: gaddar, koi mil gaya, padosan, razz, ddlj`,
            },
          ],
        }),
      });

      const searchResult = await res.json();
      const resultMovies = searchResult.choices[0].message.content.split(",");
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
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 rounded-md"
          placeholder="Let's watch something good"
        />
        <button
          className="col-span-3 m-4 py-2 px-4 text-white rounded-lg bg-red-600"
          onClick={handleSearchResult}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default DeepSeekSearchBar;
