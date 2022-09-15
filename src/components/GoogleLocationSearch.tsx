import * as React from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";
import { LatLong } from "@yext/search-headless-react";

interface GoogleLocationSearchProps {
  onLocationSelected?: (latLong: LatLong, addressDisplayName: string) => void;
}

const GoogleLocationSearch = ({
  onLocationSelected,
}: GoogleLocationSearchProps) => {
  const handleSelect = (data) => {
    geocodeByPlaceId(data.value.place_id)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        onLocationSelected &&
          onLocationSelected(
            { latitude: lat, longitude: lng },
            data.label.split(",")[0]
          );
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  return (
    <GooglePlacesAutocomplete
      // TODO: hide api key
      apiKey={"AIzaSyCaEs3e2U_ejxhLNdt-qgD0OZ0yXMYFCFo"}
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
