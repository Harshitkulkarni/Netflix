import React from "react";
import MovieList from "./MovieList";
import Headder from "./Headder";
import useFilmCatagory from "../Hooks/useFilmCatagory";

const Films = () => {
  const { genres, moviesByGenre, error } = useFilmCatagory();
  return (
    <div>
      <div>
        <Headder />
      </div>
      <div className="mt-0 md:pl-12 relative  bg-black">
        <div className="text-white pt-32 pl-4">
          <h1 className="text-6xl font-extrabold">Films</h1>
          <p className="w-2/4 text-lg pt-3">
            Films move us like nothing else can, whether they’re scary, funny,
            dramatic, romantic or anywhere in-between. So many titles, so much
            to experience.
          </p>
        </div>
        <div className="pt-6">
          {genres.map((genre) => (
            <MovieList
              key={genre.id}
              title={genre.name}
              movies={moviesByGenre[genre.name]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Films;
