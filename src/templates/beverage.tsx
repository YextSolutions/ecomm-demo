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
import ProductCounter from "../components/ProductCounter";
import ToastMessage from "../components/ToastMessage";

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
      "c_variantBeverages.id",
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
    title: `Toast | ${props.document.name}`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const Beverage: Template<TemplateRenderProps> = ({ document }) => {
  const [showToast, setShowToast] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    document.c_variantBeverages.sort((a, b) => a.c_price - b.c_price)[0]
  );

  const getDetailTableData = () => {
    const data: { key: string; value: string }[] = [
      {
        key: "Category",
        value: flattenCategories(document.c_beverageCategories)?.[
          document.c_beverageCategories.length - 1
        ].name,
      },
    ];
    if (document.c_originCountry) {
      const origin = document.c_usState
        ? `${document.c_usState}, ${document.c_originCountry} `
        : document.c_originCountry;
      data.push({
        key: "Origin",
        value: origin,
      });
    }
    if (document.c_abv) {
      data.push({
        key: "ABV",
        value: `${document.c_abv}%`,
      });
    }
    return data;
  };

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <PageLayout>
      <div className="pb-16">
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
          {/* TODO: type and sort */}
          {document.c_variantBeverages
            ?.sort((a, b) => a.c_price - b.c_price)
            .map((variant, i) => (
              <button
                key={uuid()}
                className={classNames("border-2 px-6 py-2", {
                  "border-black bg-orange": variant.id === selectedVariant?.id,
                })}
                onClick={() => setSelectedVariant(variant)}
              >
                <div>{variant.size}</div>
                <div className="text-sm">{`$${variant.c_price}`}</div>
              </button>
            ))}
        </div>
        <div className="hidden md:flex">
          <ProductCounter
            cartVariant={{
              id: selectedVariant?.id,
              price: Number(selectedVariant.c_price),
              size: selectedVariant.size,
              name: document.name,
              photo: document.primaryPhoto,
            }}
            addedToCart={showToastMessage}
          />
        </div>
        <div className="py-8">
          <div className="pb-2 text-2xl">Product Details</div>
          <DetailTable details={getDetailTableData()} />
        </div>
        {document.description && (
          <div className="py-8">
            <div className="text-2xl">Description</div>
            <p>{document.description}</p>
          </div>
        )}
        <div className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-center border-t bg-white md:hidden">
          <ProductCounter
            cartVariant={{
              id: selectedVariant?.id,
              price: Number(selectedVariant.c_price),
              size: selectedVariant.size,
              name: document.name,
              photo: document.primaryPhoto,
            }}
            addedToCart={showToastMessage}
          />
        </div>
      </div>
      <ToastMessage
        show={showToast}
        message="Added to Cart"
        onClose={() => setShowToast(false)}
      />
    </PageLayout>
  );
};

export default Beverage;
