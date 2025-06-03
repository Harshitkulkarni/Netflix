import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const MovieList = ({ movies, title }) => {
  const sliderRef = useRef(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
    }
  };

  return (
    movies && (
      <div className="px-6">
        <h1 className="text-stone-100 py-10 text-3xl">{title}</h1>
        <div className="relative group">
          {/* Left Navigation */}
          <div className="hidden group-hover:block absolute top-[50%] -translate-y-[50%] left-0 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-10 hover:bg-black/40">
            <IoChevronBackOutline onClick={slideLeft} size={30} />
          </div>

          {/* Movie List Container */}
          <div
            ref={sliderRef}
            className="flex overflow-x-scroll scrollbar-hide scroll-smooth"
          >
            <div className="flex py-4">
              {movies.map((movie) => (
                <Link key={movie?.id} to={"/watch/" + movie.id}>
                  <MovieCard imgLink={movie?.poster_path} />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Navigation */}
          <div className="hidden group-hover:block absolute top-[50%] -translate-y-[50%] right-0 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-10 hover:bg-black/40">
            <IoChevronForwardOutline onClick={slideRight} size={30} />
          </div>
        </div>
      </div>
    )
  );
};

export default MovieList;
