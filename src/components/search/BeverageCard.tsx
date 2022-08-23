import * as React from "react";
import { CardProps } from "@yext/search-ui-react";
import { Beverage } from "../../types/beverages";
import { Image } from "@yext/pages/components";
import { StarRating } from "../StarRating";

export const BeverageCard = ({ result }: CardProps<Beverage>): JSX.Element => {
  const beverage = result.rawData;
  return (
    <div className="flex py-4 px-4 hover:bg-gray-200">
      {beverage.primaryPhoto && (
        <div className="mr-4 w-16 md:w-10">
          <Image image={beverage.primaryPhoto} layout="intrinsic" />
        </div>
      )}
      <div>
        <p className=" line-clamp-2">{beverage.name}</p>
        {beverage.c_rating && <StarRating rating={beverage.c_rating} />}
      </div>
    </div>
  );
};
