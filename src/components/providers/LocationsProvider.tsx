import * as React from "react";
import { createContext, useEffect, useReducer, Dispatch } from "react";
import { getRuntime } from "@yext/pages/util";
import { LatLong } from "@yext/search-headless-react";
import { deepEqual } from "../../util";

export interface LocationState {
  userLocation?: {
    displayName: string;
    latLong: LatLong;
  };
  checkedLocation?: {
    addressLine1: string;
  };
}

export enum LocationActionType {
  SetUserLocation,
  SetAddressLine1,
  ClearCheckedLocation,
}

export interface SetUserLocation {
  type: LocationActionType.SetUserLocation;
  payload: {
    userLocation?: {
      displayName: string;
      latLong: LatLong;
    };
  };
}

export interface SetAddressLine1 {
  type: LocationActionType.SetAddressLine1;
  payload: {
    checkedLocation?: {
      addressLine1: string;
    };
  };
}

export interface ClearCheckedLocation {
  type: LocationActionType.ClearCheckedLocation;
}

export type LocationActions =
  | SetUserLocation
  | SetAddressLine1
  | ClearCheckedLocation;

export const locationReducer = (
  state: LocationState,
  action: LocationActions
): LocationState => {
  switch (action.type) {
    case LocationActionType.SetUserLocation:
      return { ...state, userLocation: action.payload.userLocation };
    case LocationActionType.SetAddressLine1:
      return { ...state, checkedLocation: action.payload.checkedLocation };
    case LocationActionType.ClearCheckedLocation:
      return { ...state, checkedLocation: undefined };
    default:
      return state;
  }
};

export interface ProviderProps {
  children: React.ReactNode;
}

export const LocationContext = createContext<{
  locationState: LocationState;
  dispatch: Dispatch<LocationActions>;
}>({
  locationState: {
    checkedLocation: {
      addressLine1: "ALL",
    },
  },
  dispatch: () => null,
});

const LocationsProvider = ({ children }: ProviderProps) => {
  const [locationState, dispatch] = useReducer(locationReducer, {});

  useEffect(() => {
    if (!getRuntime().isServerSide) {
      const storageState: {
        userLocation?: { displayName: string; latLong: LatLong };
      } = JSON.parse(localStorage.getItem("userLocation") || "{}");
      if (storageState) {
        dispatch({
          type: LocationActionType.SetUserLocation,
          payload: storageState,
        });
      }
    }
  }, [getRuntime().isServerSide]);

  useEffect(() => {
    if (!getRuntime().isServerSide) {
      if (
        !deepEqual(
          locationState.userLocation,
          JSON.parse(localStorage.getItem("userLocation") || "{}")?.userLocation
        )
      ) {
        localStorage.setItem(
          "userLocation",
          JSON.stringify({ userLocation: locationState.userLocation })
        );
      }
    }
  }, [locationState.userLocation]);

  return (
    <LocationContext.Provider value={{ locationState, dispatch }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationsProvider;
