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
import { ComplexImageType, Image, ImageType } from "@yext/pages/components";
import PageLayout from "../components/PageLayout";
import { StarRating } from "../components/StarRating";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import classNames from "classnames";
import DetailTable from "../components/DetailTable";
import { flattenCategories } from "../util";
import Breadcrumbs from "../components/Breadcrumbs";
import ProductCounter from "../components/ProductCounter";
import ToastMessage from "../components/ToastMessage";
import { RadioGroup } from "@headlessui/react";
import PlaceholderIcon from "../icons/PlaceholderIcon";
import ReviewsProvider from "../components/providers/ReviewsProvider";
import ReviewsSection from "../components/ReviewsSection";

export const config: TemplateConfig = {
  stream: {
    $id: "beverage",
    fields: [
      "id",
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
      "c_variantBeverages.primaryPhoto",
      "c_abv",
      "slug",
      "ref_reviewsAgg.averageRating",
      "ref_reviewsAgg.reviewCount",
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
  const {
    id,
    name,
    description,
    c_originCountry,
    c_usState,
    c_rating,
    c_beverageCategories,
    c_abv,
    c_variantBeverages,
    primaryPhoto,
    ref_reviewsAgg,
  } = document;

  const [showToast, setShowToast] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    c_variantBeverages.sort((a, b) => a.c_price - b.c_price)[0]
  );
  const [beverageImage, setBeverageImage] = useState<
    ComplexImageType | ImageType | undefined
  >();
  const rating = ref_reviewsAgg[0]?.averageRating ?? c_rating;
  // const rating = c_rating;

  // useEeffect that logs the document to the console
  useEffect(() => {
    console.log(document);
  }, [document]);

  useEffect(() => {
    if (selectedVariant && selectedVariant.primaryPhoto) {
      setBeverageImage(selectedVariant.primaryPhoto);
    } else {
      setBeverageImage(primaryPhoto);
    }
  }, [selectedVariant, primaryPhoto]);

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const getDetailTableData = () => {
    const data: { key: string; value: string }[] = [
      {
        key: "Category",
        value:
          flattenCategories(c_beverageCategories)?.[
            document.c_beverageCategories.length - 1
          ].name,
      },
    ];
    if (c_originCountry) {
      const origin = c_usState
        ? `${c_usState}, ${c_originCountry} `
        : c_originCountry;
      data.push({
        key: "Origin",
        value: origin,
      });
    }
    if (c_abv) {
      data.push({
        key: "ABV",
        value: `${c_abv}%`,
      });
    }
    return data;
  };

  return (
    <PageLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6    lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product details */}
          <div className="lg:max-w-lg ">
            <Breadcrumbs
              currentPage={name}
              links={flattenCategories(c_beverageCategories ?? [])}
              containerCss="py-8"
            />
            <div>
              <div className="mt-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {name}
                </h1>
              </div>
              {c_rating && <StarRating rating={rating} starSize={32} />}
            </div>

            {/* Product form */}
            <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
              <section aria-labelledby="options-heading">
                <h2 id="options-heading" className="sr-only">
                  Product options
                </h2>

                <form>
                  <div className="pb-4 sm:flex sm:justify-between">
                    {/* Size selector */}
                    <RadioGroup
                      value={selectedVariant}
                      onChange={setSelectedVariant}
                    >
                      <RadioGroup.Label className="block text-sm font-medium text-gray-700">
                        Size
                      </RadioGroup.Label>
                      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {c_variantBeverages?.map((variant) => (
                          <RadioGroup.Option
                            as="div"
                            key={uuid()}
                            value={variant}
                            className={({ active }) =>
                              classNames(
                                active ? "ring-2 ring-orange" : "",
                                "relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none"
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label
                                  as="p"
                                  className="text-base font-medium text-gray-900"
                                >
                                  {variant.size}
                                </RadioGroup.Label>
                                <div
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-orange"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-lg"
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </form>
                <div className="py-4">
                  {selectedVariant && (
                    <ProductCounter
                      cartVariant={{
                        id: selectedVariant?.id,
                        price: Number(selectedVariant.c_price),
                        size: selectedVariant.size ?? "",
                        name: name,
                        photo: beverageImage,
                      }}
                      addedToCart={showToastMessage}
                    />
                  )}
                </div>
              </section>
            </div>
          </div>
          {/* Product image */}
          {beverageImage ? (
            <div className="my-8 w-56">
              <Image image={beverageImage} />
            </div>
          ) : (
            <PlaceholderIcon />
          )}
          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>
            <div className="mt-4 space-y-6">
              <DetailTable details={getDetailTableData()} />

              <p className="text-base text-gray-500">{description}</p>
            </div>
          </section>
        </div>
        <ToastMessage
          show={showToast}
          message="Added to Cart"
          onClose={() => setShowToast(false)}
        />
      </div>
      <ReviewsProvider>
        <ReviewsSection entityId={id} overallRating={rating} />
      </ReviewsProvider>
    </PageLayout>
  );
};

export default Beverage;
