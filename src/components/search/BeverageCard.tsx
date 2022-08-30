import * as React from "react";
import { CardProps } from "@yext/search-ui-react";
import { Beverage } from "../../types/beverages";
import { Image } from "@yext/pages/components";
import { StarRating } from "../StarRating";
import classNames from "classnames";

interface BeverageCardProps<T> extends CardProps<T> {
  autocomplete?: boolean;
}

export const BeverageCard = ({
  result,
  autocomplete,
}: BeverageCardProps<Beverage>): JSX.Element => {
  const beverage = result.rawData;
  return (
    <div
      className={classNames("flex py-4 px-4 ", {
        "hover:bg-gray-200": autocomplete,
        "flex-col  border-4 border-transparent hover:border-orange":
          !autocomplete,
      })}
    >
      {beverage.primaryPhoto && (
        <div
          className={classNames({
            "flex w-full justify-center": !autocomplete,
          })}
        >
          <div
            className={classNames("mr-4  ", {
              "w-24": !autocomplete,
              "w-16 md:w-10": autocomplete,
            })}
          >
            <Image image={beverage.primaryPhoto} layout="fill" />
          </div>
        </div>
      )}
      <div className="flex flex-col  justify-start">
        <p className="text-black line-clamp-2">{beverage.name}</p>
        {beverage.c_rating && <StarRating rating={beverage.c_rating} />}
      </div>
    </div>
  );
};
