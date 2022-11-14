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

  const [numStars, setNumStars] = useState(0);
  const [halfStar, setHalfStar] = useState(false);

  useEffect(() => {
    //set the number of full stars
    setNumStars(Math.floor(rating));

    //set the number of half stars
    if (rating % 1 >= 0.5) {
      setHalfStar(true);
    }
  }, [rating]);

  return (
    <div className="flex text-orange">
      {[...Array(numStars)].map((_) => (
        <FaStar key={uuid()} size={starSize} />
      ))}
      {halfStar && <FaStarHalf size={starSize} />}
    </div>
  );
};
