import * as React from "react";
import { StandardFacets } from "@yext/search-ui-react";

const BeverageFilters = () => {
  return (
    <>
      <StandardFacets
        customCssClasses={{
          standardFacetsContainer: "py-8",
          optionLabel: "font-bold text-base",
          optionInput: "text-orange focus:ring-orange w-7 h-7",
        }}
        // searchOnChange={false}
        showMoreLimit={5}
      />
    </>
  );
};

export default BeverageFilters;
