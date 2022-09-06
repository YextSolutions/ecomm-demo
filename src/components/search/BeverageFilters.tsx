import * as React from "react";
import {
  NumericalFacets,
  NumericalFacetsProps,
  StandardFacets,
  StandardFacetsProps,
} from "@yext/search-ui-react";

interface BeverageFiltersProps {
  standardFacetsProps?: StandardFacetsProps;
  numericalFacetProps?: NumericalFacetsProps;
}
const BeverageFilters = ({
  standardFacetsProps,
  numericalFacetProps,
}: BeverageFiltersProps) => {
  return (
    <>
      <StandardFacets {...standardFacetsProps} />
      <NumericalFacets {...numericalFacetProps} />
    </>
  );
};

export default BeverageFilters;
