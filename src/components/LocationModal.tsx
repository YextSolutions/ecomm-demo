import * as React from "react";
import {
  useSearchActions,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import searchConfig from "../config/searchConfig";
import { useEffect, useState } from "react";
import { VerticalResults } from "@yext/search-ui-react";
import { LatLong } from "@yext/search-headless-react";
import LocationCard from "./search/LocationCard";
import classNames from "classnames";
import GoogleLocationSearch from "./GoogleLocationSearch";

interface LocationSelectorProps {
  addressLatLong?: LatLong;
}

const LocationSelectorDropdown = ({
  addressLatLong,
}: LocationSelectorProps) => {
  const searchActions = useSearchActions();

  useEffect(() => {
    if (addressLatLong) {
      searchActions.setUserLocation(addressLatLong);
      searchActions.executeVerticalQuery();
    }
  }, [addressLatLong]);

  return (
    // TODO: add loading icon when stores are loading, maybe use local storage if address doesn't change
    <VerticalResults
      CardComponent={LocationCard}
      customCssClasses={{
        verticalResultsContainer: "overflow-y-auto h-[calc(100vh-170px)]",
      }}
    />
  );
};

interface LocationModalProps {
  onLocationSelected?: (addressDisplayName: string) => void;
  onClickOutOfModal?: () => void;
}

const LocationModal = ({
  onLocationSelected,
  onClickOutOfModal,
}: LocationModalProps) => {
  const [addressInputOpen, setAddressInputOpen] = useState(true);
  const [latLong, setLatLong] = useState<LatLong | undefined>();

  useEffect(() => {
    const latLongString = localStorage.getItem("latLong");
    if (latLongString) {
      const latLong = JSON.parse(latLongString);
      setLatLong(latLong);
    }
  }, []);

  const handleLocationSelected = (
    latLong: LatLong,
    addressDisplayName: string
  ) => {
    onLocationSelected && onLocationSelected(addressDisplayName);
    setLatLong(latLong);
    localStorage.setItem("latLong", JSON.stringify(latLong));
  };

  const handleModalButtonClick = () => setAddressInputOpen(!addressInputOpen);

  return (
    <>
      <div className=" w-full bg-white md:mx-auto md:max-w-xl">
        <div className="grid grid-cols-2 py-4">
          <button
            className={classNames("mx-4 flex justify-center ", {
              "border-b-2 border-dark-orange": addressInputOpen,
            })}
            onClick={handleModalButtonClick}
          >
            <div>Delivery Address</div>
          </button>
          <button
            className={classNames("mx-4 flex justify-center ", {
              "border-b-2 border-dark-orange": !addressInputOpen,
              "text-gray-400": !latLong,
            })}
            onClick={handleModalButtonClick}
            disabled={!latLong}
          >
            Available Stores
          </button>
        </div>
        {addressInputOpen && (
          <GoogleLocationSearch onLocationSelected={handleLocationSelected} />
        )}
        {!addressInputOpen && (
          <SearchHeadlessProvider
            {...searchConfig}
            headlessId="location-searcher"
            verticalKey="locations"
          >
            <LocationSelectorDropdown addressLatLong={latLong} />
          </SearchHeadlessProvider>
        )}
      </div>
      <div
        className="fixed top-28 -z-10 h-full w-full bg-gray-600 opacity-50"
        onClick={onClickOutOfModal}
      ></div>
    </>
  );
};

export default LocationModal;
