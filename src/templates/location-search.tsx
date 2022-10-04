import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import PageLayout from "../components/PageLayout";
import "../index.css";
import MapSearch from "../components/map/MapSearch";

export const getPath: GetPath<TemplateProps> = () => {
  return "/locations";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Toast Locations",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const LocationSearch: Template<TemplateRenderProps> = () => {
  return (
    <PageLayout
      verticalKey="locations"
      containerCss="mx-0 max-w-none px-0 md:px-0"
      hideLocationPicker
    >
      <MapSearch />
    </PageLayout>
  );
};

export default LocationSearch;
