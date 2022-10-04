import * as React from "react";
import { CardComponent, CardProps } from "@yext/search-ui-react";
import Location from "../../../types/locations";

const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
};

const LocationMapCard: CardComponent<Location> = ({
  result,
}: CardProps<Location>) => {
  const { address } = result.rawData;
  return (
    <div className="bg-white p-4">
      {/* <h1 className="text-slate-900">{result.rawData.name}</h1> */}
      <p className="text-sm font-bold text-black">{address.line1}</p>
      <p className="text-sm font-bold text-black">
        {address.city}, {address.region}, {address.postalCode}{" "}
      </p>
      <p className="mt-1 text-xs italic text-slate-500">
        {metersToMiles(result.distanceFromFilter ?? 0)} mi
      </p>
      <a
        target="_blank"
        href={`/location/${result.id}`}
        className="text-blue-700 text-xs hover:underline"
        rel="noreferrer"
      >
        View Location Website
      </a>
    </div>
  );
};

export default LocationMapCard;
