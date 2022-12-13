import * as React from "react";
import { VerticalResults } from "@yext/search-ui-react";
import { BeverageCard } from "./cards/BeverageCard";
import Beverage from "../../types/beverages";

const BeverageVerticalResults = () => {
  return (
    <>
      <VerticalResults<Beverage>
        customCssClasses={{
          verticalResultsContainer: "grid grid-cols-2 lg:grid-cols-3 gap-4",
        }}
        CardComponent={BeverageCard}
        displayAllOnNoResults={false}
      />
    </>
  );
};

export default BeverageVerticalResults;
