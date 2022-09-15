import * as React from "react";
import { CardProps } from "@yext/search-ui-react";
import Location from "../../types/locations";

// TODO: use context to set location filter
const LocationCard = ({ result }: CardProps<Location>) => {
  const location = result.rawData;

  const renderRadio = () => {
    return (
      <div className="flex items-center py-4">
        <input
          type="radio"
          name="location"
          value={location.id}
          className="form-radio mr-3 text-orange  focus:outline-orange"
        />
        <label className="text-sm text-black">
          <div>{location.address.line1}</div>
          <div>
            {`${location.address.city}, ${location.address.region} ${location.address.postalCode}`}{" "}
          </div>
        </label>
      </div>
    );
  };

  return <div className="mx-4 border-b">{renderRadio()}</div>;
};

export default LocationCard;
