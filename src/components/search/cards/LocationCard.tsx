import * as React from "react";
import { CardProps } from "@yext/search-ui-react";
import Location from "../../../types/locations";
import {
  LocationActionType,
  LocationContext,
} from "../../providers/LocationsProvider";
import { useContext } from "react";

// TODO: use context to set location filter
const LocationCard = ({ result }: CardProps<Location>) => {
  const location = result.rawData;

  const { dispatch, locationState } = useContext(LocationContext);

  const handleRadioClick = () => {
    if (location.address.line1) {
      dispatch({
        type: LocationActionType.SetAddressLine1,
        payload: {
          checkedLocation: {
            addressLine1: location.address.line1,
          },
        },
      });
    }
  };

  const renderRadio = () => {
    return (
      <div className="flex items-center py-4">
        <input
          type="radio"
          name="location"
          value={location.id}
          onClick={handleRadioClick}
          checked={
            location.address.line1 ===
            locationState.checkedLocation?.addressLine1
          }
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
