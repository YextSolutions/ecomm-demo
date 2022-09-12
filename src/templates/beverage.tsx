/* eslint-disable react/prop-types */
import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
  TemplateConfig,
} from "@yext/pages";
import "../index.css";
import { Image } from "@yext/pages/components";
import PageLayout from "../components/PageLayout";
import { StarRating } from "../components/StarRating";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export const config: TemplateConfig = {
  stream: {
    $id: "beverage",
    fields: [
      "name",
      "primaryPhoto",
      "description",
      "c_rating",
      "c_usState",
      "c_originCountry",
      "c_beverageCategories.name",
      "c_beverageCategories.c_parentCategory.name",
      "c_variantBeverages.name",
      "c_variantBeverages.c_price",
      "c_variantBeverages.size",
      "c_abv",
      "slug",
    ],
    filter: {
      entityTypes: ["ce_beverage"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = (props) => {
  return props.document.slug;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = (
  props
): HeadConfig => {
  return {
    title: props.document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

// TODO: Category in details, breadcrumbs, links to product pages from search
const Beverage: Template<TemplateRenderProps> = ({ document }) => {
  const [selectedVariant, setSelectedVariant] = useState(0);

  const renderNameCell = (text: string, cssStyles?: string) => {
    return (
      <div
        className={twMerge(
          "border-x border-t border-black bg-gray-200 py-2 pl-1",
          cssStyles
        )}
      >
        {text}
      </div>
    );
  };

  const renderValueCell = (text: string, cssStyles?: string) => {
    return (
      <div
        className={twMerge(
          "border-t border-r border-black py-2 pl-1",
          cssStyles
        )}
      >
        {text}
      </div>
    );
  };

  return (
    <PageLayout>
      <div className="flex py-8">
        <div className="w-40">
          <Image image={document.primaryPhoto} />
        </div>
        <div>
          <div className="py-4 text-2xl font-bold">{document.name}</div>
          {document.c_rating && (
            <StarRating rating={document.c_rating} starSize={32} />
          )}
        </div>
      </div>
      <div className="flex gap-4">
        {document.c_variantBeverages?.map((variant, i) => (
          <button
            key={uuid()}
            className={classNames("border-2 px-6 py-2", {
              "border-black bg-orange": i === selectedVariant,
            })}
            onClick={() => setSelectedVariant(i)}
          >
            <div>{variant.size}</div>
            <div className="text-sm">{`$${variant.c_price}`}</div>
          </button>
        ))}
      </div>
      <div className="py-4">
        <div className="pb-2 text-2xl">Product Details</div>
        <div className="grid grid-cols-2">
          {renderNameCell("Category")}
          {renderValueCell("Light Beer")}
          {renderNameCell("Origin")}
          {renderValueCell(
            `${document.c_usState && `${document.c_usState},`} ${
              document.c_originCountry
            }`
          )}
          {renderNameCell("ABV", "border-b")}
          {renderValueCell(`${document.c_abv}%`, "border-b")}
        </div>
      </div>
      <div className="py-8">
        <div className="text-2xl">Description</div>
        <p>{document.description}</p>
      </div>
    </PageLayout>
  );
};

export default Beverage;
