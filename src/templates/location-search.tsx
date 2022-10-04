import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import {
  FilterSearch,
  Pagination,
  ResultsCount,
  VerticalResults,
} from "@yext/search-ui-react";
import * as React from "react";
import MapboxMap from "../components/map/MapboxMap";
import PageLayout from "../components/PageLayout";
import LocationMapCard from "../components/search/cards/LocationMapCard";
import Location from "../types/locations";
import "../index.css";
import MapPin from "../components/map/MapPin";
import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import classNames from "classnames";
import { Switch } from "@headlessui/react";

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return "/locations";
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: "Toast Locations",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const LocationSearch: Template<TemplateRenderProps> = () => {
  const [searchPanelOpen, setSearchPaneOpen] = useState(false);
  // const [mapViewOpen, setMapViewOpen] = useState(false);

  const windowDimensions = useWindowDimensions();

  // use effect hook that closes the search pane if the window is resized to be larger than 768px
  useEffect(() => {
    if (windowDimensions) {
      if (windowDimensions.width > 768) {
        setSearchPaneOpen(true);
      } else {
        setSearchPaneOpen(false);
      }
    }
  }, [windowDimensions?.width]);

  return (
    <PageLayout
      verticalKey="locations"
      containerCss="mx-0 max-w-none px-0  md:px-0"
      hideLocationPicker
    >
      <div className="flex h-12 w-full items-center justify-center bg-light-orange shadow-lg md:hidden">
        <div className="px-2">List</div>
        <Switch
          checked={!searchPanelOpen}
          onChange={() => setSearchPaneOpen(!searchPanelOpen)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full bg-white`}
        >
          <span className="sr-only">Toggle List View</span>
          <span
            className={`${
              !searchPanelOpen ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-orange transition`}
          />
        </Switch>
        <div className="px-2">Map</div>
      </div>
      <div className="relative flex min-h-[calc(100vh-112px)] w-full flex-col md:min-h-[calc(100vh-64px)]">
        <div className="flex max-h-[calc(100vh-112px)] w-full flex-row overflow-y-auto md:max-h-[calc(100vh-64px)]">
          <div
            className={classNames(
              "h-full w-full overflow-auto border-r border-slate-300 bg-slate-50 shadow-md",
              { hidden: !searchPanelOpen }
            )}
          >
            <div className="fixed top-28 z-20 w-full border-b border-slate-300 bg-light-orange shadow-lg md:top-16 md:w-96">
              <h3 className="pl-4 font-semibold text-dark-orange  md:pt-4">
                Find a Location
              </h3>
              <FilterSearch
                customCssClasses={{
                  filterSearchContainer: "m-2",
                  optionsContainer: "z-50",
                }}
                searchOnSelect={true}
                searchFields={[
                  {
                    entityType: "location",
                    fieldApiName: "builtin.location",
                  },
                ]}
              />
              <ResultsCount
                customCssClasses={{
                  resultsCountContainer: "mx-4 my-0 text-sm",
                }}
              />
            </div>
            <div className="fixed top-[224px] bottom-0 z-10 flex w-full flex-col overflow-y-auto md:static md:w-96">
              <VerticalResults<Location>
                displayAllOnNoResults={false}
                customCssClasses={{
                  verticalResultsContainer:
                    "flex flex-col divide-y  divide-slate-300   md:pt-[129px]",
                  verticalResultsLoading: "opacity-100",
                }}
                CardComponent={LocationMapCard}
              />
              <Pagination
                customCssClasses={{
                  paginationContainer: "mb-0 p-2 bg-white",
                  paginationLoading: "opacity-100",
                }}
              />
            </div>
          </div>
          <div className="absolute top-0 bottom-0 left-0 right-0 md:left-96">
            <MapboxMap<Location>
              mapboxAccessToken={import.meta.env.YEXT_PUBLIC_MAPBOX_API_KEY} // This is the API key we set up in the previous step
              getCoordinate={(location) =>
                location.rawData.yextDisplayCoordinate
              }
              PinComponent={MapPin}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LocationSearch;
