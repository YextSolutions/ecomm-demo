import * as React from "react";
import {
  NumericalFacets,
  NumericalFacetsProps,
  StandardFacets,
  StandardFacetsProps,
} from "@yext/search-ui-react";
import CategoryTiles from "./CategoryTiles";
import { CategoryLink } from "../../types/kg";

interface BeverageFiltersProps {
  standardFacetsProps?: StandardFacetsProps;
  numericalFacetProps?: NumericalFacetsProps;
  categories?: CategoryLink[];
}
const BeverageFilters = ({
  standardFacetsProps,
  numericalFacetProps,
  categories,
}: BeverageFiltersProps) => {
  return (
    <div className="md:max-w-lg">
      {categories && (
        <CategoryTiles title="CATEGORIES" categories={categories} />
      )}
      <StandardFacets {...standardFacetsProps} />
      <NumericalFacets
        includedFieldIds={["c_abv"]}
        {...numericalFacetProps}
        customCssClasses={{ rangeInputContainer: "hidden" }}
      />
    </div>
  );
};

export default BeverageFilters;
