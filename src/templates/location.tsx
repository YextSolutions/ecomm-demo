import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import PageLayout from "../components/PageLayout";
import "../index.css";
import { SearchBar } from "@yext/search-ui-react";
import StaticMap from "../components/map/StaticMap";

// Documentation Here: https://hitchhikers.yext.com/docs/pages/templates/?target=exports
export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    fields: ["id", "name", "address", "yextDisplayCoordinate"],
    filter: {
      entityTypes: ["location"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ? document.slug : document.id.toString();
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: `Toast | ${document.name}`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description: document.description,
        },
      },
    ],
  };
};

const Location: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site, name, id, yextDisplayCoordinate, address } = document;

  return (
    <>
      <PageLayout>
        <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2">
          <div>
            {yextDisplayCoordinate && (
              <StaticMap
                longitude={yextDisplayCoordinate.longitude}
                latitude={yextDisplayCoordinate.latitude}
              />
            )}
          </div>
          <div>
            <div className="mb-4 text-3xl text-dark-orange">{name}</div>
            <div>
              <p className="font-bold text-black">{address.line1}</p>
              <p className="font-bold text-black">
                {address.city}, {address.region}, {address.postalCode}{" "}
              </p>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Location;
