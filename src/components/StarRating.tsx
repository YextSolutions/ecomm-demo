import * as React from "react";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { v4 as uuid } from "uuid";

interface StarRatingProps {
  rating?: number;
  starSize?: number;
}

export const StarRating = ({ rating, starSize = 16 }: StarRatingProps) => {
  if (!rating) return <></>;

  const [numStars, setNumStars] = useState([0, 0]);

  useEffect(() => {
    const ratingParts = rating.toString().split(".");
    if (ratingParts.length === 1) {
      setNumStars([Number(ratingParts[0]), 0]);
    } else {
      const decicmalPart = Number(ratingParts[1]);
      if (decicmalPart < 2) {
        setNumStars([Number(ratingParts[0]), 0]);
      } else if (decicmalPart > 2 && decicmalPart < 7) {
        setNumStars([Number(ratingParts[0]), 1]);
      } else {
        setNumStars([Number(ratingParts[0]) + 1, 0]);
      }
    }
  }, [rating]);

  return (
    <div className="flex text-orange">
      {[...Array(numStars[0])].map((_) => (
        <FaStar key={uuid()} size={starSize} />
      ))}
      {numStars[1] === 1 && <FaStarHalf size={starSize} />}
    </div>
  );
};
