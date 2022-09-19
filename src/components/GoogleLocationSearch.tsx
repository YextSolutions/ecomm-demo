import * as React from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";
import {
  LocationActionType,
  LocationContext,
} from "./providers/LocationsProvider";
import { useContext } from "react";

const GOOGLE_API_KEY = import.meta.env.YEXT_PUBLIC_GOOGLE_API_KEY;

// TODO: fix TS errors
const GoogleLocationSearch = () => {
  const { dispatch } = useContext(LocationContext);

  const handleSelect = (data) => {
    geocodeByPlaceId(data.value.place_id)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        dispatch({
          type: LocationActionType.SetUserLocation,
          payload: {
            userLocation: {
              displayName: data.label.split(",")[0],
              latLong: { latitude: lat, longitude: lng },
            },
          },
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  return (
    <GooglePlacesAutocomplete
      // TODO: hide api key
      apiKey={GOOGLE_API_KEY}
      selectProps={{
        onChange: handleSelect,
        styles: {
          container: (provided) => ({
            ...provided,
            maxWidth: "320px",
            margin: "0 auto",
            // paddingTop: "1rem",
            paddingBottom: "1rem",
            borderColor: "black",
          }),
          dropdownIndicator: (provided) => ({
            // ...provided,
            display: "none",
          }),
          menu: (provided) => ({
            ...provided,
            padding: "0",
            marginTop: "0",
          }),
        },
      }}
    />
  );
};

export default GoogleLocationSearch;
