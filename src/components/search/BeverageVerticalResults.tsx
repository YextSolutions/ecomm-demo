import * as React from "react";
import { VerticalResults } from "@yext/search-ui-react";
import { BeverageCard } from "./BeverageCard";
import { Beverage } from "../../types/beverages";

const BeverageVerticalResults = () => {
  return (
    <>
      <VerticalResults<Beverage>
        customCssClasses={{
          verticalResultsContainer: "grid grid-cols-2 md:grid-cols-3 gap-4",
        }}
        CardComponent={BeverageCard}
      />
    </>
  );
};

export default BeverageVerticalResults;
