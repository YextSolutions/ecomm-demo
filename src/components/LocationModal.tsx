import * as React from "react";
import {
  useSearchActions,
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import searchConfig from "../config/searchConfig";
import { useContext, useEffect, useState } from "react";
import LocationCard from "./search/LocationCard";
import classNames from "classnames";
import GoogleLocationSearch from "./GoogleLocationSearch";
import {
  LocationActionType,
  LocationContext,
} from "./providers/LocationsProvider";
import { VerticalResults } from "@yext/search-ui-react";
import Location from "../types/locations";
import { useLocationFilter } from "../hooks/useLocationFilter";

interface LocationSelectorDropdownProps {
  hidden?: boolean;
}
const LocationSelectorDropdown = ({
  hidden = false,
}: LocationSelectorDropdownProps) => {
  const searchActions = useSearchActions();
  const { dispatch } = useContext(LocationContext);

  const { locationState } = useContext(LocationContext);

  useEffect(() => {
    if (locationState.userLocation?.latLong) {
      searchActions.setUserLocation(locationState.userLocation.latLong);
      searchActions.executeVerticalQuery();
    }
  }, [locationState.userLocation?.latLong]);

  const handleAllStoresClick = () => {
    dispatch({
      type: LocationActionType.SetAddressLine1,
      payload: { checkedLocation: { addressLine1: "ALL" } },
    });
  };

  return (
    // TODO: add loading icon when stores are loading, maybe use local storage if address doesn't change
    !hidden ? (
      <div className="h-[calc(100vh-170px)] overflow-y-auto">
        <div className="mx-4 flex items-center py-4">
          <input
            type="radio"
            name="location"
            onClick={handleAllStoresClick}
            checked={locationState.checkedLocation?.addressLine1 === "ALL"}
            className="form-radio mr-3 text-orange  focus:outline-orange"
          />
          <label className="text-sm text-black">All Stores</label>
        </div>
        <VerticalResults<Location> CardComponent={LocationCard} />
      </div>
    ) : (
      <></>
    )
  );
};

const locationsSearcher = provideHeadless({
  ...searchConfig,
  verticalKey: "locations",
  headlessId: "location-searcher",
});

interface LocationModalProps {
  onClickOutOfModal?: () => void;
}

const LocationModal = ({ onClickOutOfModal }: LocationModalProps) => {
  const [addressInputOpen, setAddressInputOpen] = useState(true);

  const { locationState } = useContext(LocationContext);

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
            disabled={addressInputOpen}
          >
            <div>Delivery Address</div>
          </button>
          <button
            className={classNames("mx-4 flex justify-center ", {
              "border-b-2 border-dark-orange": !addressInputOpen,
              "text-gray-400": !locationState.userLocation,
            })}
            onClick={handleModalButtonClick}
            disabled={!locationState.userLocation || !addressInputOpen}
          >
            Available Stores
          </button>
        </div>
        <SearchHeadlessProvider searcher={locationsSearcher}>
          {addressInputOpen && <GoogleLocationSearch />}
          <LocationSelectorDropdown hidden={addressInputOpen} />
        </SearchHeadlessProvider>
      </div>
      <div
        className="fixed top-28 -z-10 h-full w-full bg-gray-600 opacity-50"
        onClick={onClickOutOfModal}
      ></div>
    </>
  );
};

export default LocationModal;
