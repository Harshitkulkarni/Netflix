import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";
import Headder from "./Headder";
import useVideoBackgroundTrailer from "../Hooks/useVideoBackgroundTrailer";
import MoviesVideos from "./MoviesVideos";
import { useSelector } from "react-redux";

const WatchPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const MoviesVideo = useSelector((store) => store.moviesData.moviesVideos);
  console.log(MoviesVideo);

  useVideoBackgroundTrailer(movieId);

  const fetchMovieById = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    setMovieDetails(json);
  };

  useEffect(() => {
    fetchMovieById();
  }, [movieId]);

  if (movieDetails == null) return null;
  //console.log(movieDetails);

  //coberting runtime of movie into hours
  const runtime = movieDetails?.runtime;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const genres = movieDetails?.genres.map((genre) => genre.name).join(", ");

  return (
    <div className="bg-gray-900 h-screen relative">
      <div className="absolute top-0 left-0 w-full z-30">
        <Headder />
      </div>
      <div className="relative h-screen">
        <img
          className="pt-24 w-full h-screen object-cover"
          src={"https://image.tmdb.org/t/p/w500/" + movieDetails?.backdrop_path}
          alt={movieDetails?.title}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
        <div className="absolute top-0 left-0 z-20 pt-96 pl-12">
          <h1 className="text-6xl w-6/12 font-bold text-yellow-400">
            {movieDetails?.title}
          </h1>
          <p className="text-gray-400 text-lg pt-5">
            {movieDetails?.release_date.substring(0, 4)} | {hours}h {minutes}m |{" "}
            {genres}
          </p>
          <p className="pt-5 text-lg w-5/12 text-white">
            {movieDetails?.overview}
          </p>
        </div>
      </div>
      <div className="bg-slate-900">
        <h1 className=" text-white text-4xl pl-12 pt-10">
          Videos | {movieDetails?.title}
        </h1>
        <div className="pt-5 pl-12 flex ">
          {MoviesVideo.map((video) => (
            <MoviesVideos key={video.id} videoId={video.key} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
