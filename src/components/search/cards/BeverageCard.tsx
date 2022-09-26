import * as React from "react";
import { CardProps } from "@yext/search-ui-react";
import { Beverage } from "../../../types/beverages";
import { Image } from "@yext/pages/components";
import { StarRating } from "../../StarRating";
import classNames from "classnames";

interface BeverageCardProps<T> extends CardProps<T> {
  autocomplete?: boolean;
}

export const BeverageCard = ({
  result,
  autocomplete,
}: BeverageCardProps<Beverage>): JSX.Element => {
  const beverage = result.rawData;
  const priceRange = beverage.c_variantBeverages?.reduce(
    (acc, variant) => {
      const variantPrice = Number(variant.c_price);
      if (variantPrice) {
        acc.min = Math.min(acc.min, variantPrice);
        acc.max = Math.max(acc.max, variantPrice);
      }
      return acc;
    },
    { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER }
  );

  return (
    <a href={beverage.slug}>
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
              className={classNames("mr-4", {
                "w-24": !autocomplete,
                "w-16 md:w-10": autocomplete,
              })}
            >
              <Image image={beverage.primaryPhoto} />
            </div>
          </div>
        )}
        <div>
          <div
            className={classNames("flex flex-col justify-start pb-2", {
              "h-20 pb-0": !autocomplete,
            })}
          >
            <p className="text-black line-clamp-2">{beverage.name}</p>
            {beverage.c_rating && <StarRating rating={beverage.c_rating} />}
          </div>
          {priceRange &&
            priceRange.min < Number.MAX_SAFE_INTEGER &&
            priceRange.max > Number.MIN_SAFE_INTEGER && (
              <div className="text-black">{`$${priceRange.min.toFixed(
                2
              )} - $${priceRange.max.toFixed(2)}`}</div>
            )}
        </div>
      </div>
    </a>
  );
};
