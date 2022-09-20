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
import DetailTable from "../components/DetailTable";
import { flattenCategories } from "../util";
import Breadcrumbs from "../components/Breadcrumbs";

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
      "c_beverageCategories.slug",
      "c_beverageCategories.c_parentCategory.name",
      "c_beverageCategories.c_parentCategory.slug",
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

// TODO: links to product pages from search
const Beverage: Template<TemplateRenderProps> = ({ document }) => {
  const [selectedVariant, setSelectedVariant] = useState(0);

  return (
    <PageLayout>
      <Breadcrumbs
        currentPage={document.name}
        links={flattenCategories(document.c_beverageCategories)}
        containerCss="py-8"
      />
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
      <div className="flex gap-4 py-8">
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
      <div className="py-8">
        <div className="pb-2 text-2xl">Product Details</div>
        <DetailTable
          details={{
            Category: flattenCategories(document.c_beverageCategories)?.[
              document.c_beverageCategories.length - 1
            ].name,
            Origin: `${document.c_usState && `${document.c_usState},`} ${
              document.c_originCountry
            }`,
            ABV: `${document.c_abv}%`,
          }}
        />
      </div>
      <div className="py-8">
        <div className="text-2xl">Description</div>
        <p>{document.description}</p>
      </div>
    </PageLayout>
  );
};

export default Beverage;