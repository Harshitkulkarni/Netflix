import React from "react";
import { IMG_URL } from "../utils/constants";
const MovieCard = ({ imgLink }) => {
  if (!imgLink) return null;
  return (
    <div className="w-36 md:w-48 pr-4 mx-4 transition-transform transform hover:scale-110 cursor-pointer">
      <img className="rounded-md " src={IMG_URL + imgLink} alt="move-poster" />
    </div>
  );
};

export default MovieCard;
