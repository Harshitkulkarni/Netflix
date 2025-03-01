import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailers } from "../utils/moviesData";

const useVideoBackgroundTrailer = (id) => {
  //this fetching the trailer and updating to the store
  const trailerVideo = useSelector((store) => store.moviesData.trailers);
  const dispatch = useDispatch();
  const getMovieTeaser = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    //console.log(json);
    const trailer = json.results.filter((video) => video.type == "Trailer");
    dispatch(addTrailers(trailer));
  };

  useEffect(() => {
    !trailerVideo && getMovieTeaser();
  }, []);
};

export default useVideoBackgroundTrailer;
